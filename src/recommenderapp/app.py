"""
Copyright (c) 2024 Jonas Trepanier, Anirudh Kaluri, Siddhi Mule
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""
# pylint: disable=locally-disabled, multiple-statements, fixme, line-too-long
# pylint: disable=locally-disabled, multiple-statements, fixme, wrong-import-order
# pylint: disable=locally-disabled, multiple-statements, fixme, wrong-import-position
# pylint: disable=locally-disabled, multiple-statements, fixme, broad-exception-caught
# pylint: disable=locally-disabled, multiple-statements, fixme, invalid-name
# pylint: disable=locally-disabled, multiple-statements, fixme, f-string-without-interpolation

import json
import sys
import pandas as pd
sys.path.append("/app/")
import os
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
import jwt
from functools import wraps
from datetime import datetime, timedelta
#from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
from werkzeug.security import generate_password_hash,check_password_hash
from src.models.user_models import db, User, Watchlist, Movies, Ratings, Friends
from src.prediction_scripts.item_based import recommend_for_new_user
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_cors import cross_origin
from src.recommenderapp.search import Search
from src.recommenderapp.utils import beautify_feedback_data, send_email_to_user, get_imdb_rating
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app= Flask(__name__)
#format for the value in below key-value pair is postgresql://username:password@host:port/database_name
app.config['SQLALCHEMY_DATABASE_URI']= f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PW')}@postgres:5432/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']=os.getenv('APP_SECRET_KEY')



#cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, origins=["http://frontend:3000","http://localhost:3000"])  # Allow requests from frontend container


@app.route("/login",methods=['POST'])
def login_user():
    '''
    Retrieves username and password from service
    And generates login token if they are an existing account
    '''
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
    '''
    Adds username and password to USER
    '''
    #request_obj=request.data
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
    '''
    Retrieves user-id
    '''
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
            request.userID=decoded['user_id']
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
    '''
    Returns user.id from request
    '''
    return jsonify({'user':request.userID}), 201




@app.route("/getWatchlist", methods = ['GET'])
@get_user_id
def get_watchlist():
    '''
    Returns the current user's watchlist
    '''
    try:

        watchlist = Watchlist.query.filter_by(user_id=request.userID).all()
        #if the watchlist is empty for this user, return error message
        if len(watchlist) == 0:
            return jsonify({'watchlist': []}), 201
        #get splice of watchlist with only the username items
        movies_csv_path = os.path.join(PROJECT_ROOT, "data", "movies.csv")
        movies_data = pd.read_csv(movies_csv_path)
        modified_watchlist=[]
        for movie in watchlist:
            title_series=movies_data.loc[movies_data['imdb_id']==movie.imdb_id,'title']
            movie_title=title_series.iloc[0]
            movie.title=movie_title
            modified_watchlist.append({
                "title":movie.title,
                "imdbID":movie.imdb_id
            })

        return jsonify({"watchlist":modified_watchlist})
    except Exception as e:
        return jsonify({"error":f"error fetching movies{e}"})


@app.route("/addtoWatchlist", methods = ['POST'])
@get_user_id
def add_to_watchlist():
    '''
    Adds selected movie to the user's watchlist
    '''
    try:
        data = request.get_json()
        imdbID = data.get('imdbID')
        existing_entry = Watchlist.query.filter_by(user_id=request.userID, imdb_id = imdbID).first()
        #if the watchlist already contains the movie for this user, return an error message
        if existing_entry is not None:
            return jsonify({'Error': 'Item already in watchlist'}), 409
        #If not, create a new entry and add it to the session
        new_entry = Watchlist(user_id=request.userID, imdb_id = imdbID)
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'addedToWatchlist':True, 'message': 'Watchlist entry created successfully', 'Whose watchlist was added': request.userID}), 201

    except Exception as e:
        return jsonify({"error": f"error adding to watchlist {e}"})


@app.route("/deleteFromWatchlist", methods = ['DELETE'])
@get_user_id
def delete_from_watchlist():
    """
    deletes items from watchlist
    """
    try:
        data = request.get_json()
        imdbID = data.get('imdbID')
        existing_entry = Watchlist.query.filter_by(user_id=request.userID, imdb_id = imdbID).first()
        #If the item to be deleted is not in the watchlist, raise an error message
        if existing_entry is None:
            return jsonify({'error': 'Item not already in watchlist'}), 409
        db.session.delete(existing_entry)
        db.session.commit()
        return jsonify({'deletedFromWatchlist':True,'message': 'Watchlist entry deleted successfully', 'Whose watchlist I deleted': existing_entry.user_id}), 201
    except Exception as e:
        return jsonify({"error": f"error deleting from watchlist {e}"})


@app.route("/predict", methods=["POST"])
@get_user_id
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
    length = len(recommendations)
    recommendations, genres, imdb_id = recommendations[:min(100, length)], genres[:min(100, length)], imdb_id[:min(100, length)]
    isInWatchList=[]
    imdb_ratings = []
    for imdb in imdb_id:
        rating = get_imdb_rating(imdb)
        if rating is not None:
            imdb_ratings.append(str(rating))
        else:
            imdb_ratings.append("N/A")
        existing_watchlist_movie=Watchlist.query.filter_by(user_id=request.userID,imdb_id=imdb).first()
        if existing_watchlist_movie is not None:
            isInWatchList.append(True)
        else:
            isInWatchList.append(False)

    resp = {"recommendations": recommendations, "genres": genres, "imdb_id":imdb_id, "Watchlist_status": isInWatchList, "imdb_ratings": imdb_ratings}
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

@app.route("/review", methods=["POST"])
@get_user_id
def review():
    """
    Handles the submission of a movie review
    """
    data = json.loads(request.data)
    # logger.info("Received data: %s", data)  # Log the data variable

    movie = Movies.query.filter_by(name=data["review"]["movie"]).first()
    d = datetime.utcnow()
    timestamp = d.strftime("%Y-%m-%d %H:%M:%S")

    new_review = Ratings(user_id=request.userID, movie_id=movie.idmovies, score=data["review"]["score"], review=data["review"]["review"], time=timestamp)
    db.session.add(new_review)
    db.session.commit()
    return request.data

@app.route("/getWallData", methods=["GET"])
@get_user_id
def wall_posts():
    """
    Gets the posts for the wall
    """
    ratings = Ratings.query.all()
    if len(ratings) == 0:
        return jsonify({'ratings': []}), 201
    json_ratings = []
    for rating in ratings:
        movie = Movies.query.filter_by(idmovies=rating.movie_id).first()
        user = User.query.filter_by(id=rating.user_id).first()
        json_ratings.append({
            'id': rating.idratings,
            'username': user.username,
            'movieTitle': movie.name,
            'imdbID': movie.imdb_id,
            'score': rating.score,
            'review': rating.review,
            'time': rating.time.isoformat()  # Convert the timestamp to a string format
        })
    return jsonify({'ratings': json_ratings}), 200

@app.route("/movies", methods=["GET"])
def get_movies():
    movies = Movies.query.all()
    json_movies = []
    for movie in movies:
        json_movies.append({
            'id': movie.idmovies,
            'title': movie.name
        })
    return jsonify(json_movies)




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
