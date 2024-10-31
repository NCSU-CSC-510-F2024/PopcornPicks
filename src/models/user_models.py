# # models/user.py
from sqlalchemy import Column, Integer, String
from flasksqlalchemy import SQLAlchemy
from flask import currentapp as app


db=SQLAlchemy()

class User(db.Model):
    tablename = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(300),nullable=False)

    def repr(self):
        return f"<User {self.username}>"

class Watchlist(db.Model):
    __tablename = 'watchlists'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    imdb_id = Column(String(80), nullable=False)
