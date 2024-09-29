import React, { useState } from 'react';
import '../Styles/SearchBar.css';

const SearchBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    carName: '',
    fuelType: '',
    personCapacity: '',
    carType: '',
    price: '',
    pickupLocation: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [id]: value
    }));
    onFilterChange({ ...filters, [id]: value });
  };

  return (
    <div className="search-bar">
      <div className="input-group">
        <label htmlFor="carName">Car Name</label>
        <input
          type="text"
          id="carName"
          value={filters.carName}
          placeholder="Search for a car"
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="fuelType">Fuel Type</label>
        <select id="fuelType" value={filters.fuelType} onChange={handleInputChange}>
          <option value="">Any</option>
          <option value="CNG">CNG</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="personCapacity">Person Capacity</label>
        <select id="personCapacity" value={filters.personCapacity} onChange={handleInputChange}>
          <option value="">Any</option>
          <option value="2">2 Seater</option>
          <option value="4">4 Seater</option>
          <option value="6">6 Seater</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="carType">Car Type</label>
        <select id="carType" value={filters.carType} onChange={handleInputChange}>
          <option value="">Any</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="price">Max Price</label>
        <input
          type="number"
          id="price"
          value={filters.price}
          placeholder="Price"
          onChange={handleInputChange}
          max="10000"
        />
      </div>

      <div className="input-group">
        <label htmlFor="pickupLocation">Pickup Location</label>
        <select id="pickupLocation" value={filters.pickupLocation} onChange={handleInputChange}>
          <option value="">Any</option>
          <option value="Location1">Location 1</option>
          <option value="Location2">Location 2</option>
          <option value="Location3">Location 3</option>
        </select>
      </div>

      <button type="button" className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
