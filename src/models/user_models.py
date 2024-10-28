# # models/user.py
# from sqlalchemy import Column, Integer, String
# from src.recommenderapp.app import db

# class User(db.Model):
#     __tablename__ = 'users'

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     username = Column(String(80), unique=True, nullable=False)
#     password = Column(String(120),nullable=False)

#     def __repr__(self):
#         return f"<User {self.username}>"