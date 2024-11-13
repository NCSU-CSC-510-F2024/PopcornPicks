"""
Copyright (c) 2024 Jonas Trepanier, Anirudh Kaluri, Siddhi Mule
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""
# # models/user.py
from flask_sqlalchemy import SQLAlchemy # type: ignore
from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP # type: ignore
from sqlalchemy.orm import relationship # type: ignore
from sqlalchemy.dialects.postgresql import DOUBLE_PRECISION # type: ignore
from datetime import datetime



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

# Movies Table
class Movies(db.Model):
    '''
    Class to hold movie data
    '''
    __tablename__ = 'movies'

    idmovies = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False)
    imdb_id = Column(String(45), nullable=False, unique=True)

    # Relationships
    ratings = relationship('Ratings', backref='movie', lazy=True)


# Ratings Table
class Ratings(db.Model):
    '''
    Class to hold ratings data
    '''
    __tablename__ = 'ratings'

    idratings = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    movie_id = Column(Integer, ForeignKey('movies.idmovies'), nullable=False)
    score = Column(DOUBLE_PRECISION, nullable=False)
    review = Column(Text)
    time = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)

# Friends Table
class Friends(db.Model):
    '''
    Class to hold friendship data
    '''
    __tablename__ = 'friends'

    idfriendship = Column(Integer, primary_key=True, autoincrement=True)
    idusers = Column(Integer, ForeignKey('users.id'), nullable=False)
    idfriend = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Relationships
    user = relationship('User', foreign_keys=[idusers], backref='user_friends')
    friend = relationship('User', foreign_keys=[idfriend], backref='friend_friends')
