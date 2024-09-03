import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ car }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    drivingLicenseNumber: '',
    aadharNumber: '',
    residentialAddress: '',
    pickupDate: '',
    returnDate: '',
    additionalMessage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and submission logic here
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Book Now</h3>
      <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required />
      <input type="text" name="mobileNumber" placeholder="Mobile Number (+91)" onChange={handleInputChange} required />
      <input type="text" name="drivingLicenseNumber" placeholder="Driving License Number" onChange={handleInputChange} required />
      <input type="text" name="aadharNumber" placeholder="Aadhar Number" onChange={handleInputChange} required />
      <input type="text" name="residentialAddress" placeholder="Residential Address" onChange={handleInputChange} required />
      <input type="date" name="pickupDate" placeholder="Pick-Up Date" onChange={handleInputChange} required />
      <input type="date" name="returnDate" placeholder="Return Date" onChange={handleInputChange} required />
      <textarea name="additionalMessage" placeholder="Additional Message" onChange={handleInputChange}></textarea>
      <button type="submit">Get OTP</button>
    </form>
  );
};

export default BookingForm;
