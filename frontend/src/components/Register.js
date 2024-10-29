import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import { createUser } from '../apiCalls';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await createUser(username, password);
        setShowSuccessModal(true);
      } catch (err) {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card style={{ width: '450px', backgroundColor: 'rgba(0, 0, 0, 0.75)', color: 'white' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!errors.username}
                  style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '10px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '10px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
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

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered backdrop="static" keyboard={false}>
        <Modal.Body style={{ backgroundColor: '#141414', color: 'white', border: '2px solid #e50914' }}>
          <h4 style={{ color: '#e50914' }}>Account Created Successfully!</h4>
          <p>Your PopcornPicks account has been set up. You're ready to start exploring!</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#141414', borderTop: 'none' }}>
          <Button variant="danger" onClick={handleCloseSuccessModal}>
            Continue to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;