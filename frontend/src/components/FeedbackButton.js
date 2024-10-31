import React from 'react';

const FeedbackButton = () => {
  return (
    <div className="row feedbackDiv">
      <div className="col-md-12">
        <button className="btn btn-primary" name="feedback" data-toggle="modal" id="feedback" data-target="#exampleModalCenter">
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackButton;