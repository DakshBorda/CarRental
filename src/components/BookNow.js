import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import BookingCarCard from './BookingCarCard';
import BookingForm from './BookingForm';
import BookingPolicy from './BookingPolicy';
import './BookNow.css';

const BookNow = () => {
  const { id } = useParams(); // Extract id from route parameters
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id]);

  return (
    <div className="book-now-container">
      {car ? (
        <>
          <BookingCarCard car={car} />
          <BookingForm car={car} />
          <BookingPolicy car={car} />
        </>
      ) : (
        <p>Loading car details...</p>
      )}
    </div>
  );
};

export default BookNow;
