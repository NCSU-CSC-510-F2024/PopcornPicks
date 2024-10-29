import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../stylesheet.css';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: '#e50914', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    PopcornPicks🍿
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link" to="">Search</Link>
                            </li>
                        )}
                        {/* Add more nav items as needed */}
                    </ul>
                    <div className="d-flex">
                        {token ? (
                            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                                <Link to="/register" className="btn btn-danger">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;