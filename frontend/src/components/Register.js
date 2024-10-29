import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Navbar from './NavBar';
import { createUser } from '../apiCalls';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUser(email, password);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="landing-page">
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card style={{ width: '450px', backgroundColor: 'rgba(0, 0, 0, 0.75)', color: 'white' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="email" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '10px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '10px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Control 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '10px' }}
                />
              </Form.Group>

              <Button variant="danger" type="submit" className="w-100 py-2" style={{ fontSize: '16px' }}>
                Sign Up
              </Button>
            </Form>
            
            <div className="text-center mt-3" style={{ color: '#737373' }}>
              Already have an account? <Link to="/login" style={{ color: 'white' }}>Sign in now</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;