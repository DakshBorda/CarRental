// src/components/CarCard.js
import React from 'react';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={process.env.PUBLIC_URL + '/images/' + car.image} alt={car.name} className="car-image" />
      <h2>{car.name} {car.year}</h2>
      <div className="car-details">
        <div className="car-rating">
          {'⭐'.repeat(car.rating)} 
          {/* ({car.reviews} Reviews) */}
        </div>
        <div className="car-location">
          📍 {car.location}
        </div>
        <div className="car-features">
          <div>🚗 {car.seats} Seat</div>
          <div>⛽ {car.mileage} km/l</div>
          <div>🔋 {car.condition}</div>
          <div>❄️ AC</div>
        </div>
        <div className="car-price">
          ₹{car.price} / Day
        </div>
        <button className="book-now">Book Now</button>
      </div>
    </div>
  );
}

export default CarCard;
