
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/car/${carId}`);
      setCars(cars.filter(car => car._id !== carId));
      alert('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  };

  const editCar = (carId) => {
    navigate(`/edit-car/${carId}`);
  };

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginTop: '30px',
    },
    carList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      justifyContent: 'center',
      padding: 0,
      listStyleType: 'none',
      margin: 0,
    },
    carItem: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      boxSizing: 'border-box',
      position: 'relative',
      width: 'calc(50% - 15px)',
      maxWidth: 'calc(50% - 15px)',
    },
    carImage: {
      width: '231px',
      height: '138px',
      objectFit: 'cover',
      borderRadius: '5px',
      marginRight: '20px',
      flexShrink: 0,
    },
    carContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0 15px',
    },
    carName: {
      margin: '0',
      fontSize: '1.4em',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    carDetailsText: {
      margin: '5px 0',
      fontSize: '0.9em',
      color: '#555',
    },
    carActions: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      border: 'none',
      padding: '8px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '100px',
      textAlign: 'center',
    },
    editButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    deleteButton: {
      backgroundColor: '#ff4d4d',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Admin Car List</h2>
      {cars.length > 0 ? (
        <ul style={styles.carList}>
          {cars.map(car => (
            <li key={car._id} style={styles.carItem}>
              <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} style={styles.carImage} />
              <div style={styles.carContent}>
                <h3 style={styles.carName}>{car.carName}</h3>
                <p style={styles.carDetailsText}>Fuel Type: {car.fuelType}</p>
                <p style={styles.carDetailsText}>Capacity: {car.personCapacity} Seater</p>
                <p style={styles.carDetailsText}>Type: {car.carType}</p>
                <p style={styles.carDetailsText}>Location: {car.pickupLocation}</p>
                <p style={styles.carDetailsText}>₹{car.price}/day</p>
              </div>
              <div style={styles.carActions}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => editCar(car._id)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => deleteCar(car._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default AdminCarList;

