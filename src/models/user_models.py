"""
Copyright (c) 2024 Jonas Trepanier, Anirudh Kaluri, Siddhi Mule
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""
# # models/user.py
from sqlalchemy import Column, Integer, String # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore



db=SQLAlchemy()

class User(db.Model): # pylint: disable=too-few-public-methods  
    '''
    Class to hold user data.
    '''
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(300),nullable=False)

    def repr(self):
        '''
        returns the input username
        '''
        return f"<User {self.username}>"

class Watchlist(db.Model): # pylint: disable=too-few-public-methods  
    '''
    Class to hold watchlist data
    '''
    __tablename__ = 'watchlists'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    imdb_id = Column(String(80), nullable=False)
