"""
Copyright (c) 2023 Aditya Pai, Ananya Mantravadi, Rishi Singhal, Samarth Shetty
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""

import json
import sys
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
from werkzeug.security import generate_password_hash

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from search import Search
from utils import beautify_feedback_data, send_email_to_user

#sys.path.append("../../")
sys.path.append("/app/")

from src.prediction_scripts.item_based import recommend_for_new_user 
#pylint: disable=wrong-import-position
#pylint: enable=wrong-import-position


app = Flask(__name__)
#format for the value in below key-value pair is postgresql://username:password@host:port/database_name

app.config['SQLALCHEMY_DATABASE_URI']= f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PW')}@postgres:5432/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#db is an instance of sqlalchemy tied to the flask app.
db = SQLAlchemy(app)
from sqlalchemy import Column, Integer, String

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(300),nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

try:
    with app.app_context():
        print("Attempting to create tables")
        db.create_all()
        print(f"Tables created successfully")
except Exception as e:
    print(f"Error creating database tables:{e}")




app.secret_key = "secret key"

cors = CORS(app, resources={r"/*": {"origins": "*"}})



@app.route("/login",methods=['POST'])
def login_user():
    request_obj=request.data
    return jsonify({"message": "User Created"}), 200

@app.route("/createUser",methods=['POST'])
def create_user():
    request_obj=request.data
    try:
        # Get JSON data from the request
        data = request.get_json()
        # Extract the username and password from the request data
        username = data.get('username')
        password = data.get('password')

        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 409

        # Create a new user and hash the password for security
        hashed_password = generate_password_hash(password, method='scrypt')
        new_user = User(username=username, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully', 'user': new_user.username}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/")
def landing_page():
    """
    Renders the landing page.
    """
    return render_template("landing_page.html")


@app.route("/search_page")
def search_page():
    """
    Renders the search page.
    """
    return render_template("search_page.html")


@app.route("/predict", methods=["POST"])
def predict():
    """
    Predicts movie recommendations based on user ratings.
    """
    data = json.loads(request.data)
    data1 = data["movie_list"]
    training_data = []
    for movie in data1:
        movie_with_rating = {"title": movie, "rating": 5.0}
        if movie_with_rating not in training_data:
            training_data.append(movie_with_rating)
    recommendations, genres, imdb_id = recommend_for_new_user(training_data)
    recommendations, genres, imdb_id = recommendations[:10], genres[:10], imdb_id[:10]
    resp = {"recommendations": recommendations, "genres": genres, "imdb_id":imdb_id}
    return resp


@app.route("/search", methods=["POST"])
def search():
    """
    Handles movie search requests.
    """
    term = request.form["q"]
    finder = Search()
    filtered_dict = finder.results_top_ten(term)
    resp = jsonify(filtered_dict)
    resp.status_code = 200
    return resp


@app.route("/feedback", methods=["POST"])
def feedback():
    """
    Handles user feedback submission and mails the results.
    """
    data = json.loads(request.data)
    return data


@app.route("/sendMail", methods=["POST"])
def send_mail():
    """
    Handles user feedback submission and mails the results.
    """
    data = json.loads(request.data)
    user_email = data['email']
    send_email_to_user(user_email, beautify_feedback_data(data))
    return data


@app.route("/success")
def success():
    """
    Renders the success page.
    """
    return render_template("success.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
