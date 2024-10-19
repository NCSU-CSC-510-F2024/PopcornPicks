import '../stylesheet.css';

import Navbar from './NavBar';
import React from 'react';

const LandingPage = () => {
  // JavaScript functions can be defined here
  const getStarted = () => {
    // This function will handle the "Get Started!" button click
    console.log("Get Started button clicked");
    // Add more logic as needed
  };

  return (
    <div className="landing-page">
       <Navbar />

      <div className="container" style={{ marginTop: '60px' }} id="centralDivLanding">
        <div className="heading1">
          <h2><center>🎬 PopcornPicks🍿: Pick a Movie! 🎬</center></h2>
          <p style={{ textAlign: 'center', color: 'azure', fontSize: '18px' }}>
            Discover personalized movie recommendations by selecting up to 5 of your favorite films.
            <br />
            Create a watchlist and have it conveniently sent to your email.
            <br />
            Enjoy movies at your own pace, on your terms.
          </p>
          <button id="getStartedButton" onClick={getStarted} className="btn btn-primary mx-auto">Get Started!</button>
          {/* <div className="highlighted-section">
            <p>Made with ❤️ by <a href="https://github.com/adipai/PopcornPicks" target="_blank" rel="noreferrer"> PopcornPicks</a></p>
            <a href="https://github.com/adipai/PopcornPicks/blob/master/LICENSE.md" target="_blank" rel="noreferrer">MIT License Copyright (c) 2023 PopcornPicks</a>
          </div> */}
        </div>
      </div>
      <div className="d-none" id="loaderLanding">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
