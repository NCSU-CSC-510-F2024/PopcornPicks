import pytest
from flask import Flask,request
from unittest.mock import patch, MagicMock
import sys
sys.path.append("/app/")
from src.recommenderapp.app import app
from src.models.user_models import db, User, Watchlist
from werkzeug.security import generate_password_hash

app.config['TESTING'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
with app.app_context():
    db.init_app(app)
    db.create_all()

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client
        

def test_login_user(client, mocker):
    with app.app_context():
        # Setup: create a user in the database
        hashed_password = generate_password_hash('testpassword')
        user = User(username='testuser', password=hashed_password)
        db.session.add(user)
        db.session.commit()

        # Mock the database query
        mock_query = mocker.patch('src.models.user_models.User.query')
        mock_query.filter_by.return_value.first.return_value = user

        # Create a valid login payload
        response = client.post('/login', json={
            'username': 'testuser',
            'password': 'testpassword'
        })

        # Validate: check if a token is returned with 200 status code
        assert response.status_code == 200
        assert 'token' in response.json

        # Invalid credentials
        response = client.post('/login', json={
            'username': 'testuser',
            'password': 'wrongpassword'
        })
        assert response.status_code == 401
        assert response.json['error'] == 'Invalid username or password'

def test_login_wrong_credentials(client,mocker):
    with app.app_context():
        # Setup: create a user in the database
        hashed_password = generate_password_hash('testpassword2')
        user = User(username='testuser2', password=hashed_password)
        db.session.add(user)
        db.session.commit()

        # Mock the database query
        mock_query = mocker.patch('src.models.user_models.User.query')
        mock_query.filter_by.return_value.first.return_value = user

        # Invalid credentials
        response = client.post('/login', json={
            'username': 'testuser2',
            'password': 'wrongpassword'
        })
        assert response.status_code == 401
        assert response.json['error'] == 'Invalid username or password'



def test_create_new_user(client,mocker):
    with app.app_context():
        mock_query = mocker.patch('src.models.user_models.User.query')

        # Case 1: Successful user creation
        # Simulate no existing user found
        mock_query.filter_by.return_value.first.return_value = None
        
        response = client.post('/createUser', json={
            'username': 'newuser',
            'password': 'newpassword'
        })

        # Assertions for a successful user creation
        assert response.status_code == 201
        assert response.json['message'] == 'User created successfully'
        assert response.json['user'] == 'newuser'



#Duplicate username
# Simulate existing user found
def test_create_existing_user(client,mocker):
    with app.app_context():
        mock_query = mocker.patch('src.models.user_models.User.query')
        # Case 2: Duplicate username
        # Simulate existing user found
        mock_query.filter_by.return_value.first.return_value = User(username='newuser', password='dummy_password')

        response = client.post('/createUser', json={
            'username': 'newuser',
            'password': 'anotherpassword'
        })

        # Assertions for duplicate username error
        assert response.status_code == 409
        assert response.json['error'] == 'Username already exists'



def test_add_to_watchlist(client, mocker):
    with app.app_context():
        # Mock `jwt.decode` to return a specific payload without verifying a real token
        mock_jwt_decode = mocker.patch('jwt.decode')
        mock_jwt_decode.return_value = {'user_id': 100}  # Return a payload that sets `user_id` to 1

        # Set up the user and watchlist database
        user = User(id=100, username='testuser4', password=generate_password_hash('testpassword'))
        db.session.add(user)
        db.session.commit()

        # Mock the Watchlist query to simulate that the movie is not already in the watchlist
        mock_watchlist_query = mocker.patch('src.models.user_models.Watchlist.query')
        mock_watchlist_query.filter_by.return_value.first.return_value = None

        # Add a new movie to the watchlist with Authorization header
        response = client.post(
            '/addtoWatchlist', 
            json={'imdbID': 'tt1234567'}, 
            headers={"Authorization": "Bearer mock-token"}
        )

        # Assertions for a successful watchlist addition
        assert response.status_code == 201
        assert response.json['addedToWatchlist'] == True
        assert response.json['message'] == 'Watchlist entry created successfully'
        assert response.json['Whose watchlist was added'] == 100

        # Case 2: Attempt to add the same movie again
        # Simulate that the movie is already in the user's watchlist
        mock_watchlist_query.filter_by.return_value.first.return_value = Watchlist(user_id=100, imdb_id='tt1234567')

        response = client.post(
            '/addtoWatchlist', 
            json={'imdbID': 'tt1234567'}, 
            headers={"Authorization": "Bearer mock-token"}
        )

        # Assertions for duplicate watchlist entry error
        assert response.status_code == 409
        assert response.json['Error'] == 'Item already in watchlist'


def test_add_to_watchlist_duplicate(client, mocker):
    with app.app_context():
        # Mock `jwt.decode` to return a specific payload without verifying a real token
        mock_jwt_decode = mocker.patch('jwt.decode')
        mock_jwt_decode.return_value = {'user_id': 101}  # Return a payload that sets `user_id` to 1

        # Set up the user and watchlist database
        user = User(id=101, username='testuser5', password=generate_password_hash('testpassword'))
        db.session.add(user)
        db.session.commit()

        # Mock the Watchlist query to simulate that the movie is not already in the watchlist
        mock_watchlist_query = mocker.patch('src.models.user_models.Watchlist.query')
        mock_watchlist_query.filter_by.return_value.first.return_value = None

        # Add a new movie to the watchlist with Authorization header
        response = client.post(
            '/addtoWatchlist', 
            json={'imdbID': 'tt1234564'}, 
            headers={"Authorization": "Bearer mock-token"}
        )

        # Case 2: Attempt to add the same movie again
        # Simulate that the movie is already in the user's watchlist
        mock_watchlist_query.filter_by.return_value.first.return_value = Watchlist(user_id=101, imdb_id='tt1234564')

        response = client.post(
            '/addtoWatchlist', 
            json={'imdbID': 'tt1234564'}, 
            headers={"Authorization": "Bearer mock-token"}
        )

        # Assertions for duplicate watchlist entry error
        assert response.status_code == 409
        assert response.json['Error'] == 'Item already in watchlist'
