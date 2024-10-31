# # models/user.py
from sqlalchemy import Column, Integer, String
from flask_sqlalchemy import SQLAlchemy
from flask import current_app as app


db=SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(300),nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = Column(Integer, primary_key=True, autoincrement=True)
    userID = Column(String(80), unique=True, nullable=False)
    imdbID = Column(String(80), nullable=False)