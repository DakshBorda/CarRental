import React, { useState } from 'react';
import './BookNow.css';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bdate: '',
    pan: '',
    adhar: '',
    address: '',
    message: '',
    termsAccepted: false,
  });

  const car = {
    name: "Mercedes 2022",
    img: "https://linktoimage.com/car.jpg", // Replace with your actual image
    reviews: "25k",
    seat: "4",
    milage: "29.41 km/l",
    battery: "90%",
    ac: "AC",
    price: "4015.57",
    pdate: "2024-05-01",
    rdate: "2024-05-02",
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="booking-page">
      {/* Top Section */}
      <div className="car-and-form">
        <div className="car-details">
          <img className="car-image" src={car.img} alt={car.name} />
          <div className="details">
            <h2>{car.name}</h2>
            <div className="reviews">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-alt"></i>
              <p>({car.reviews} Reviews)</p>
            </div>
            <div className="features">
              <p><i className="fa fa-chair"></i> {car.seat} Seats</p>
              <p><i className="fa fa-gas-pump"></i> {car.milage}</p>
              <p><i className="fa fa-battery-full"></i> {car.battery}</p>
              <p><i className="fa fa-snowflake"></i> {car.ac}</p>
            </div>
            <div className="price">₹{car.price} / Day</div>
          </div>
        </div>

        {/* Booking Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Book Now</h2>
          <div className="form-grid">
            <div className="input-group">
              <label>Your Name:</label>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Your Pan Number:</label>
              <input type="text" name="pan" placeholder="XZYEZ039V" value={formData.pan} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Your Email:</label>
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Your Adhar Number:</label>
              <input type="text" name="adhar" placeholder="Enter 12 digits Number" value={formData.adhar} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Your Number:</label>
              <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Your Address:</label>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Your Birth Date:</label>
              <input type="date" name="bdate" value={formData.bdate} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Additional Message:</label>
              <input type="text" name="message" placeholder="Suggestions" value={formData.message} onChange={handleChange} />
            </div>
          </div>

          <div className="terms">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
            <label>I Acknowledge and accept the terms and conditions</label>
          </div>

          <button type="submit">₹{car.price} Pay Now</button>
        </form>
      </div>

      {/* Read Before You Book Section */}
      <div className="read-before">
        <h2>Read before you book!</h2>
        <div className="read-grid">
          <div>
            <h3>Booking and Rental Period</h3>
            <p>The rental period begins and ends as per the agreed-upon dates and times.</p>
            <h3>Driver Requirements</h3>
            <p>All drivers must possess a valid driver's license and meet the minimum age requirements.</p>
            <h3>Vehicle Use</h3>
            <p>Rented vehicles are to be used only for lawful purposes.</p>
          </div>
          <div>
            <h3>Vehicle Registration</h3>
            <p>All vehicles are registered and compliant with regulations.</p>
            <h3>Document Verification</h3>
            <p>Documents such as vehicle registration and insurance are verified before rental.</p>
            <h3>Vehicle Ownership</h3>
            <p>All vehicles in our inventory are company-owned.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
