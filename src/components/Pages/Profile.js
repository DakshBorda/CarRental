import React, { useEffect, useState } from 'react';
import'../Styles/profile.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ setIsLoggedIn, setIsAdmin }) => {
  const [user, setUser] = useState(null);
  // const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          withCredentials: true,
        });
        setUser(response.data);
        // const bookingsResponse = await axios.get('http://localhost:5000/api/bookings/user', {
        //   withCredentials: true,
        // });
        // setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login if fetching fails
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      {/* <div className="bookings">
        <h3>Your Bookings</h3>
        {bookings.length > 0 ? (
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking._id} className="booking-item">
                <p><strong>Car:</strong> {booking.carName}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {booking.duration} days</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings.</p>
        )}
      </div> */}
      {/* <div className="bookings">
        <h3>Your Bookings</h3>
        {bookings.length > 0 ? (
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking._id} className="booking-item">
                <p><strong>Car:</strong> {booking.carName}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {booking.duration} days</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings.</p>
        )}
      </div> */}
      
      <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
