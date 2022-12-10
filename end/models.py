from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
import datetime


db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)


class Payment(db.Model):
    __tablename__ = "payments"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.ForeignKey('users.id'), nullable=False)
    earning = db.Column(db.String(32), nullable=False)
    item = db.Column(db.String(255), nullable=False)
    cash = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String(255), nullable=False)
