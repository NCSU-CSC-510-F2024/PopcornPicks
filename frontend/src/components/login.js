import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Navbar from './NavBar';
import { loginUser } from '../apiCalls';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token);
      navigate('/search_page');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="landing-page">
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card style={{ width: '450px', backgroundColor: 'rgba(0, 0, 0, 0.75)', color: 'white' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="email" 
                  placeholder="Email or phone number" 
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

              <Button variant="danger" type="submit" className="w-100 py-2" style={{ fontSize: '16px' }}>
                Sign In
              </Button>
            </Form>
            
            <div className="text-center mt-3" style={{ color: '#737373' }}>
              New to PopcornPicks? <Link to="/register" style={{ color: 'white' }}>Sign up now</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;