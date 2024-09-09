import React from 'react';
import './Home.css';

function App() {
  return (
    <div className="homepage">
      <div className="overlay">
        <div className="content">
          <h1>Find the Perfect Ride with DriveNow</h1>
          <div className="search-box">
            <input type="text" placeholder="Search for a car" />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
