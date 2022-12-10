from flask import Flask,request,jsonify, session
from models import db, User, Payment
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import func
import datetime

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True)
server_session = Session(app)


db.init_app(app)
with app.app_context():
    db.create_all()

@app.route("/payment", methods=['GET', 'POST'])
def payment_data():
    if request.method == 'POST':
        user_id = session.get('user_id')
        earning = request.json['earning']
        time = request.json['time']
        cash = request.json['cash']
        item = request.json['item']
        payments = Payment(user_id=user_id,earning=earning, item=item, time=time, cash=cash)
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
        user_id = session.get('user_id')
        allData = db.session.query(Payment).all()
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
@app.route ("/payment/ie", methods=["GET"])        
def total():
    if request.method == 'GET':
        income = db.session.query(func.sum(Payment.cash)).filter_by(earning="income").first()
        expense = db.session.query(func.sum(Payment.cash)).filter_by(earning="expense").first()
        total = int(income[0]) - int(expense[0])
        dataDict = {
                    'total': total
                 }
        return jsonify(dataDict)
    

@app.route('/payment/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):
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
    # else:
    #     return jsonify({'error': 'payment not found'}), 404
    if request.method == 'PUT':
        earnings = request.json['earning']
        time = request.json['time']
        cash = request.json['cash']
        item = request.json['item']
        payments = db.session.query(Payment).filter(Payment.id==id).first()
        payments.earning = earnings
        payments.time = time
        payments.cash = cash
        payments.item = item
        db.session.add(payments)
        db.session.commit()
        print(payments)
        return jsonify({'status': 'Data id: ' + str(id) + ' is updated'}), 200
    # else:
    #     return jsonify({'error': 'payment not found'}), 404    
    
    if request.method == 'DELETE':
        payments = db.session.query(Payment).filter(Payment.id==id).first()
        db.session.delete(payments)
        db.session.commit()
        return jsonify({'status': 'Data id: ' + str(id) + ' is deleted!'}), 200
    else: 
        return jsonify({'error': 'payment not found'}), 404



@app.route("/@me")
def get_current_user():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({ "error": "unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/register", methods=["POST"])
def register():
    email = request.json['email']
    password = request.json['password']

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({ "error": "User alradly exist"}), 409
    hash_password = generate_password_hash(password) 
    new_user = User(email=email, password=hash_password)
    db.session.add(new_user)
    db.session.commit()       
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