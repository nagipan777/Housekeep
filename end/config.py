import os 
import redis

class ApplicationConfig:
    SECRET_KEY = os.getenv("APP_SECRET_KEY")


    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///housekeep.db"

    SESSION_TYPE = 'redis'
    SESSION_PERMAMENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis:///127.0.0.1:6379")

    UPLOAD_FOLDER = './upload/'
    
    JSON_AS_ASCII = False