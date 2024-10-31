import '../stylesheet.css'; // Adjust the path as needed

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement your email sending logic here
    // For demonstration, we'll use a timeout to simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000); // Hide the success message after 3 seconds
    }, 2000);
  };

  const handleRefresh = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div id="dataCollected">
      {isLoading && (
        <div className="d-flex justify-content-center" id="loaderSuccess">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <h1 className="hLast">Have your watchlist sent to your email!</h1>
      <br/>
      <div className="notifyDivs">
        <input className="c-checkbox" type="checkbox" id="checkbox" />
        <div className="c-formContainer" id="formContainer">
          <form className="c-form" onSubmit={handleEmailSubmit}>
            <input
              className="c-form__input"
              placeholder="E-mail"
              type="email"
              id="emailField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="c-form__buttonLabel" htmlFor="checkbox">
              <button className="c-form__button" type="submit" id="notifyButton">
                Send
              </button>
            </label>
            <label
              className="c-form__toggle"
              htmlFor="checkbox"
              data-title="Notify me"
            ></label>
          </form>
        </div>
      </div>
      <br /><br />
      <div className="d-flex justify-content-center">
        <h1>Or</h1>
      </div>
      <br /><br />
      <button
        id="refreshPage"
        className="btn btn-danger attemptBtn"
        onClick={handleRefresh}
      >
        Take another attempt
      </button>
      
      {emailSent && (
        <div
          id="emailSentSuccess"
          style={{
            display: 'block',
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <h3>Email sent successfully!</h3>
        </div>
      )}
    </div>
  );
};

export default Success;