import React, { useState, useEffect } from 'react';
import './profile.css';
import Login from './Login';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  // const history = useHistory();

  // useEffect(() => {
  //   // Fetch user data from backend (replace with your API)
  //   fetch('/api/user')
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.user))
  //     .catch((err) => console.error(err));
    
  //   // Fetch car list from backend (replace with your API)
  //   fetch('/api/cars')
  //     .then((res) => res.json())
  //     .then((data) => setCars(data.cars))
  //     .catch((err) => console.error(err));
  // }, []);

  // const handleLogout = () => {
  //   // Perform logout action (replace with your API)
  //   fetch('/api/logout')
  //     .then(() => {
  //       setUser(null);
  //       history.push('/login'); // Redirect to login page
  //     })
  //     .catch((err) => console.error(err));
  // };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Welcome, {user.name}</h1>
        {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
      </div>
      <div className="profile-content">
        <h2>Your Car List</h2>
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car._id} className="car-item">
              <h3>{car.brand} {car.model}</h3>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
