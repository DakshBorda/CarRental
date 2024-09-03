import React from 'react';
import './BookingCarCard.css'; // Ensure this file is properly linked

const BookingCarCard = ({ car }) => {
  return (
    <div className="booking-car-card">
      <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} className="car-image" />
      <div className="car-info">
        <h2>{car.carName}</h2>
        <div className="car-details">
          <p><i className="fas fa-users"></i> {car.personCapacity} Seats</p>
          <p><i className="fas fa-gas-pump"></i> {car.fuelType}</p>
          <p><i className="fas fa-location-arrow"></i> {car.pickupLocation}</p>
          <p><i className="fas fa-rupee-sign"></i> {car.price} / Day</p>
        </div>
      </div>
    </div>
  );
};

export default BookingCarCard;
