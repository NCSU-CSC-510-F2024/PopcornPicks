import pytest
from flask import Flask
from unittest.mock import patch, MagicMock
import sys
sys.path.append("/app/")
from src.recommenderapp.app import app
from src.models.user_models import db, User
from werkzeug.security import generate_password_hash

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
   
    with app.test_client() as client:
        with app.app_context():
            db.init_app(app)
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_login_user(client, mocker):
    #app=client.application
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
