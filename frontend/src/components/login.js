import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import { loginUser } from '../apiCalls';
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await loginUser(username, password);
      login(response.token); // Store the token using the login function from AuthContext
      navigate('/search_page');
    } catch (err) {
      setError('Invalid username or password');
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
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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