

// export default BookingPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/BookNow.css';

const BookingPage = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null); // State to store car details
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    drivingLicense: '',
    aadhar: '',
    address: '',
    pickupDate: '',
    returnDate: '',
    message: '',
    bdate: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the car details based on the ID
    axios
      .get(`http://localhost:5000/api/admin/cars/${id}`)
      .then((response) => {
        setCar(response.data); // Store car details in state
      })
      .catch((error) => {
        console.error('Error fetching car details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear errors as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Mobile number validation
    const phoneRegex = /^\+91\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Mobile number must start with +91 followed by 10 digits';
    }

    // Driving License validation
    if (!formData.drivingLicense.trim()) {
      newErrors.drivingLicense = 'Driving License Number is required';
    }

    // Aadhar validation
    const aadharRegex = /^\d{12}$/;
    if (!formData.aadhar) {
      newErrors.aadhar = 'Aadhar Number is required';
    } else if (!aadharRegex.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar Number must be 12 digits';
    }

    // Residential Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Residential Address is required';
    }

    // Birthdate validation
    if (!formData.bdate) {
      newErrors.bdate = 'Birthdate is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.bdate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (
        age < 18 ||
        (age === 18 && month < 0) ||
        (age === 18 && month === 0 && today.getDate() < birthDate.getDate())
      ) {
        newErrors.bdate = 'Driver must be at least 18 years old';
      }
    }

    // Pickup Date validation
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup Date is required';
    } else {
      const today = new Date();
      const pickupDate = new Date(formData.pickupDate);
      const maxPickupDate = new Date();
      maxPickupDate.setDate(today.getDate() + 7);

      if (pickupDate < new Date(today.setHours(0, 0, 0, 0))) {
        newErrors.pickupDate = 'Pickup Date cannot be in the past';
      } else if (pickupDate > maxPickupDate) {
        newErrors.pickupDate = 'Pickup Date must be within one week from today';
      }
    }

    // Return Date validation
    if (!formData.returnDate) {
      newErrors.returnDate = 'Return Date is required';
    } else if (formData.pickupDate) {
      const pickupDate = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = returnDate - pickupDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (returnDate <= pickupDate) {
        newErrors.returnDate = 'Return Date must be after Pickup Date';
      } else if (diffDays > 15) {
        newErrors.returnDate = 'Rental duration cannot exceed 15 days';
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (!formData.termsAccepted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        termsAccepted: 'You must accept the terms and conditions',
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data to send to backend
      const bookingData = {
        carId: id,
        name: formData.name,
        phone: formData.phone,
        drivingLicense: formData.drivingLicense,
        aadhar: formData.aadhar,
        address: formData.address,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        message: formData.message,
        bdate: formData.bdate,
      };

      // Replace with actual API endpoint
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);

      // Handle successful booking
      alert('Car booked successfully!');
      // Redirect or reset form as needed
      setFormData({
        name: '',
        phone: '',
        drivingLicense: '',
        aadhar: '',
        address: '',
        pickupDate: '',
        returnDate: '',
        message: '',
        bdate: '',
        termsAccepted: false,
      });
    } catch (error) {
      console.error('Error booking car:', error);
      alert('Failed to book the car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) {
    return <div>Loading car details...</div>; // Loading state while fetching car details
  }

  // Helper function to format date for input min and max attributes
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxPickupDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="booking-page">
      {/* Top Section */}
      <div className="car-and-form">
        <div className="car-details">
          <img
            className="car-image"
            src={`http://localhost:5000/${car.carPhoto}`}
            alt={car.carName}
          />
          <div className="details">
            <h2>{car.carName}</h2>
            <div className="features">
              <p>
                <i className="fa fa-chair"></i> {car.personCapacity} Seats
              </p>
              <p>
                <i className="fa fa-gas-pump"></i> {car.fuelType}
              </p>
              <p>
                <i className="fa fa-car"></i> {car.carType}
              </p>
              <p>
                <i className="fa fa-location-arrow"></i> {car.pickupLocation}
              </p>
            </div>
            <div className="price">₹{car.price} / Day</div>
          </div>
        </div>

        {/* Booking Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Book Now</h2>
          <div className="form-fields">
            <div className="input-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Mobile Number:</label>
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter Mobile Number"
                  value={formData.phone.startsWith('+91') ? formData.phone.slice(3) : formData.phone}
                  onChange={handleChange}
                  pattern="\d{10}"
                  required
                />
              </div>
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="drivingLicense">Driving License Number:</label>
              <input
                type="text"
                name="drivingLicense"
                id="drivingLicense"
                placeholder="Enter Driving License Number"
                value={formData.drivingLicense}
                onChange={handleChange}
                required
              />
              {errors.drivingLicense && <span className="error">{errors.drivingLicense}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="aadhar">Aadhar Number:</label>
              <input
                type="text"
                name="aadhar"
                id="aadhar"
                placeholder="Enter 12-digit Aadhar Number"
                value={formData.aadhar}
                onChange={handleChange}
                maxLength="12"
                pattern="\d{12}"
                required
              />
              {errors.aadhar && <span className="error">{errors.aadhar}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="address">Residential Address:</label>
              <textarea
                name="address"
                id="address"
                placeholder="Enter Your Address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="bdate">Birthdate:</label>
              <input
                type="date"
                name="bdate"
                id="bdate"
                min="1900-01-01"
                max={getTodayDate()}
                value={formData.bdate}
                onChange={handleChange}
                required
              />
              {errors.bdate && <span className="error">{errors.bdate}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="pickupDate">Pickup Date:</label>
              <input
                type="date"
                name="pickupDate"
                id="pickupDate"
                min={getTodayDate()}
                max={getMaxPickupDate()}
                value={formData.pickupDate}
                onChange={handleChange}
                required
              />
              {errors.pickupDate && <span className="error">{errors.pickupDate}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="returnDate">Return Date:</label>
              <input
                type="date"
                name="returnDate"
                id="returnDate"
                min={formData.pickupDate ? formData.pickupDate : getTodayDate()}
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
              {errors.returnDate && <span className="error">{errors.returnDate}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="message">Message (optional):</label>
              <textarea
                name="message"
                id="message"
                placeholder="Additional Information or Requests"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="input-group">
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I accept the terms and conditions
              </label>
              {errors.termsAccepted && <span className="error">{errors.termsAccepted}</span>}
            </div>

            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Book Now'}
              </button>
            </div>
          </div>
        </form>

        
      </div>
      <div className="read-before-you-book">
      <h3>Read Before You Book</h3>
      <ul>
        <li>Ensure all details are accurate before submitting the form.</li>
        <li>Check the car's availability and make sure the pickup and return dates are correct.</li>
        <li>Bring necessary documents such as a driving license, Aadhar card, and other identification proofs when picking up the car.</li>
        <li>Contact us if you have any special requests or need further assistance.</li>
        <li>Review our terms and conditions carefully before accepting.</li>
      </ul>
    </div>
    </div>
    
  );
};

export default BookingPage;
