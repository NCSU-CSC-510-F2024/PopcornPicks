"""
Copyright (c) 2023 Aditya Pai, Ananya Mantravadi, Rishi Singhal, Samarth Shetty
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""

import json
import sys
sys.path.append("/app/")
import os
import jwt
from functools import wraps
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
from werkzeug.security import generate_password_hash,check_password_hash
from src.models.user_models import db, User, Watchlist
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from search import Search
from utils import beautify_feedback_data, send_email_to_user
from src.prediction_scripts.item_based import recommend_for_new_user 
app= Flask(__name__)
#format for the value in below key-value pair is postgresql://username:password@host:port/database_name
app.config['SQLALCHEMY_DATABASE_URI']= f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PW')}@postgres:5432/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']=os.getenv('APP_SECRET_KEY')



cors = CORS(app, resources={r"/*": {"origins": "*"}})



@app.route("/login",methods=['POST'])
def login_user():
    try:
        # Get JSON data from the request
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Check if the user exists
        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Generate a JWT token valid for 1 hour
        token = jwt.encode(
            {
                'user_id': user.id,
                'exp': datetime.now() + timedelta(hours=1)
            },
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        # Return the token in the response
        return jsonify({'token': token}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

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



    
#send the request to this function
def get_user_id(f):
    @wraps(f)
    def decode_token(*args,**kwargs):
        #Extract token from the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'Authorization header missing'}), 401
        
        # The format should be "Bearer <token>"
        try:
            token = auth_header.split(" ")[1]  # Extract the token part
        except IndexError:
            return jsonify({'error': 'Token missing'}), 401

        try:
            # Decode and verify the JWT
            decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            print(f"{decoded}")  # Contains the payload (e.g., user_id, exp, etc.)
            request.userId=decoded['user_id']
        except jwt.ExpiredSignatureError:
            print(f"Token expired")
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            print(f"Invalid token")
            return jsonify({'error': 'Invalid token'}), 401
        except Exception as e:
            return jsonify({'error':f'Server side issue {e}'}), 401
        return f(*args,**kwargs)
    #decode_token.__name__=f.__name__
    return decode_token
        

@app.route("/testToken",methods=['POST'])
@get_user_id
def test_decoding():
    return jsonify({'user':request.userId}), 201


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


@app.route("/getWatchlist", methods = ['GET'])
@get_user_id
def get_watchlist():
    """
    Retrieves watchlist for user
    """
    try:
        data = request.get_json()
        username = data.get('username')
        existing_user = Watchlist.query.filter_by(username=username).first()
        #if the watchlist is empty for this user, return False
        if (not existing_user):
            return False
        #get splice of watchlist with only the username items
        user_Watchlist = Watchlist.filter(username = username).all()
        return user_Watchlist
    except:
        return("error fetching watchlist")

@app.route("/addtoWatchlist", methods = ['POST'])
def add_to_watchlist():
    """
    Adds items to watchlist
    """
    try:
        data = request.get_json()
        username = data.get('username')
        movie = data.get('movie')
        imdbID = data.get('imdbID')
        existing_entry = Watchlist.query.filter_by(username=username, imdbID = imdbID).first()
        #if the watchlist already contains the movie for this user, return an error message
        if(existing_entry):
            return jsonify({'error': 'Item already in watchlist'}), 409
        
        #If not, create a new entry and add it to the session
        new_entry = Watchlist(username=username, movie = movie, imdbID = imdbID)
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'Watchlist entry created successfully', 'movie_added': new_entry.movie}), 201
    except:
        return("error adding to watchlist")
    

@app.route("/deleteFromWatchlist", methods = ['POST'])
def delete_from_watchlist():
    """
    deletes items from watchlist
    """
    try:
        data = request.get_json()
        username = data.get('username')
        movie = data.get('movie')
        imdbID = data.get('imdbID')
        existing_entry = Watchlist.query.filter_by(username=username, imdbID = imdbID).first()
        #If the item to be deleted is not in the watchlist, raise an error message
        if(not existing_entry):
            return jsonify({'error': 'Item not already in watchlist'}), 409
        #Otherwise delete item from the session
        #Watchlist.delete.where(username = username, imdbID = imdbID)
        db.session.delete(existing_entry)
        return jsonify({'message': 'Watchlist entry deleted successfully', 'movie_deleted': existing_entry.movie}), 201
    except:
        return("error deleting from watchlist")


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

    inWatchlist = []
    watchlist = get_watchlist()


    #iterate through the list of imdb_ids and check
    #if they are present in the watchlist
    if(watchlist):
        for id in imdb_id:
            if(watchlist.query.filter_by(imdbID = imdb_id).first()):
                inWatchlist.append(True)
            else:
                inWatchlist.append(False)
    else:
        for id in imdb_id:
            inWatchlist.append(False)

    resp = {"recommendations": recommendations, "genres": genres, "imdb_id":imdb_id, "Watchlist_status": inWatchlist}
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
    try:
        with app.app_context():
            print("Attempting to create tables")
            db.init_app(app)
            db.create_all()
            print(f"Tables created successfully")
            app.run(host="0.0.0.0",port=5000,debug=True)
    except Exception as e:
        print(f"Error creating database tables:{e}")





    
