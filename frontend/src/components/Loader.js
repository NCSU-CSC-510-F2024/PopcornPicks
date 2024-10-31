import React from 'react';

function Loader() {
  return (
    <div className="d-none" id="loader">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Loader;
