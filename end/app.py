import os
import io
from flask import Flask,request,jsonify, session
from models import db, User, Payment
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from sqlalchemy import func, create_engine
import csv
import pandas as pd


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True)
server_session = Session(app)


db.init_app(app)
with app.app_context():
    db.create_all()

@app.route("/payment", methods=['GET', 'POST'])
def index():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({ "error": "unauthorized"}), 401

    if request.method == 'POST':
        user_id = session.get('user_id')
        earning = request.json['earning']
        time = request.json['time']
        cash = request.json['cash']
        item = request.json['item']
        payments = Payment(user_id=user_id, earning=earning, item=item, time=time, cash=cash)
        db.session.add(payments)
        db.session.commit()
        ## print(f'{payments.id} {payments.earning} {payments.time} {payments.cash} {payments.item}')
        return jsonify({ 
            "id": payments.id,
            "user_id": payments.user_id,
            "earning": payments.earning,
            "time": payments.time,
            "cash": payments.cash,
            "item": payments.item                         
        })
    if request.method == 'GET':
        allData = db.session.query(Payment).filter(Payment.user_id==user_id).order_by(Payment.time.desc()).all()
        dataJson = []
        for data in allData:
            id = data.id
            earnings = data.earning
            time = data.time
            item = data.item
            cash = data.cash
            dataDict = {
                'id': str(id),
                'earning': earnings,
                'time': time,
                'cash': cash,
                'item': item
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)
    

ALLOWED_EXTENSIONS = {'csv'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/payment/upload", methods=['POST'])
def upload():
    if request.method == 'POST':
        user_id = session.get('user_id')
        if 'file' not in request.files:
            return jsonify({'error': 'must need file'}), 409
        csv_file = request.files['file']
        if csv_file.filename == '':
            return jsonify({'error': 'No selected file'}), 409
        if 'text/csv' != csv_file.mimetype:
            return jsonify(message='Not accept but only csv file'), 415
        uni_string = csv_file.stream.read()
        df = pd.read_csv(io.BytesIO(uni_string), encoding='utf8')
        for row in df.itertuples():
            print(row)
            payments = Payment(user_id=user_id, earning=row[1], time=row[2], cash=row[3],item=row[4])
            db.session.add(payments)
            db.session.commit()
        return jsonify({'message': 'sucess read'}), 200

@app.route ("/payment/ie", methods=["GET"])        
def total():
    if request.method == 'GET':
        user_id = session.get('user_id')
        income = db.session.query(func.sum(Payment.cash)).filter_by(earning="income",user_id=user_id).first()
        expense = db.session.query(func.sum(Payment.cash)).filter_by(earning="expense",user_id=user_id).first()
        total = int(income[0]) - int(expense[0])
        if total == 0:
            return jsonify({ 'total': 0 }), 200
        else:
            dataDict = {
                        'total': total
                     }
            return jsonify(dataDict), 200
        
    

@app.route('/payment/update/<int:id>', methods=['GET','PUT'])
def update_data(id):
    payment_id = id
    print(payment_id)
    if request.method == 'GET':
        user_id = session.get('user_id')
        data = db.session.query(Payment).get(id)
        id = data.id
        user_id= data.user_id
        earnings = data.earning
        time = data.time
        item = data.item
        cash = data.cash
        dataDict = {
             "id": str(id),
             "user_id": user_id, 
             "earning": earnings,
             "time": time,
             "cash": cash,
             "item": item
           }
        print(dataDict)
        return jsonify(dataDict)
    if request.method == 'PUT':
        earning = request.json['earning']
        time = request.json['time']
        cash = request.json['cash']
        item = request.json['item']
        user_id = session.get('user_id')
        payments = db.session.query(Payment).filter(Payment.id==id).first()
        if earning == '' or earning == None:
            earning = payments.earning
        else:
            payments.earning = earning
        if time == '' or time == None:
            time = payments.time
        else:
            payments.time = time
        if cash == '' or cash == None:
            cash = payments.cash
        else:
            payments.cash = cash
        if item == '' or item == None:
            item =  payments.item
        else:
            payments.item = item
        db.session.commit()
        return jsonify({'status': 'Data id: ' + str(id) + ' is updated'}), 200
    # else:
    #     return jsonify({'error': 'payment not found'}), 404    
    # 
@app.route('/payment/Delete/<int:id>', methods=['DELETE'])
def delete_data(id): 
    user_id = session.get('user_id')
    if request.method == 'DELETE':
        payments = db.session.query(Payment).filter(Payment.id==id).first()
        db.session.delete(payments)
        db.session.commit()
        return jsonify({'status': 'Data id: ' + str(id) + ' is deleted!'}), 200
    else: 
        return jsonify({'error': 'payment not found'}), 404



""" @app.route("/@me")
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({ "error": "unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })
 """

@app.route("/register", methods=["POST"])
def register():
    email = request.json['email']
    password = request.json['password']
    user_exists = User.query.filter_by(email=email).first() ## is not None

    special_symbols = ['!','#','$','&','-','_','%']
    if user_exists:
        return jsonify({"error": "User alradly exist"}), 409
    if not email:
        return jsonify({"error": "Must type email"}), 409
    if not password:
        return jsonify({"error": "Must enter password"}),409
    if not any(char in special_symbols for char in password):
            return jsonify({"error":"Must contain at least 1 approved symbol."}), 409
    if not any(char.isdigit() for char in password):
        return jsonify({"error":"Must contain at least 1 number."}), 409
    if not any(char.isupper() for char in password):
        return jsonify({"error":"Must contain at least uppercase letter"}),409
    

    hash_password = generate_password_hash(password) 
    new_user = User(email=email, password=hash_password)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id        
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

    
@app.route ("/login", methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({ "error": "User none"}), 409
    if not check_password_hash(user.password, password):
        return jsonify({ "error": "password not confirm"}), 409

    session['user_id'] = user.id
    print(user.id, user.email)
    return jsonify({
        "id": user.id,
        "email": user.email
    })

 
@app.route("/logout",methods=["POST"])
def logout():
    session.pop('user_id')
    return "200"


if __name__ == "__main__":
    app.run(debug=True)