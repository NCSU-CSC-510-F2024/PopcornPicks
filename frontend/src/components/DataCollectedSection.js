import React from 'react';

function DataCollectedSection() {
  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="row">
        <div className="col-md-8">
          <div id="dataCollected" style={{ display: 'none' }}>
            <h1>Thanks!! Your response was stored.</h1>
            <input
              type="button"
              id="refreshPage"
              className="btn btn-danger"
              name="refreshPage"
              value="Take another attempt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataCollectedSection;
