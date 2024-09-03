import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="input-group">
        <label htmlFor="car">Car</label>
        <input type="text" id="car" placeholder="Search for a car" />
      </div>
      <div className="input-group">
        <label htmlFor="location">Location</label>
        <select id="location" name="location">
            <option value="location1">Yogi Chowk, Surat</option>
            <option value="location2">Varachha, Surat</option>
            <option value="location3">Katargam, Surat</option>
                       
         </select>
      </div>
      <div className="input-group">
        <label htmlFor="duration">Duration</label>
        <input type="text" id="duration" placeholder="duration" />
      </div>
      <button type="submit" className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
