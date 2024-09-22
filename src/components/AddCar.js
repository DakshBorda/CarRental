import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [carDetails, setCarDetails] = useState({
    carPhoto: '',
    carName: '',
    fuelType: 'Petrol',
    personCapacity: 0,
    carType: 'Sedan',
    pickupLocation: 'Option 1',
    price: '',
  });

  const handleChange = (e) => {
    setCarDetails({
      ...carDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCarDetails({
      ...carDetails,
      carPhoto: e.target.files[0],
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // Remove existing commas
    if (!isNaN(value) && Number(value) >= 0) {
      const formattedValue = new Intl.NumberFormat('en-IN').format(value); // Format with commas
      setCarDetails({
        ...carDetails,
        price: formattedValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in carDetails) {
      formData.append(key, carDetails[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/add-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert(response.data.msg);
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car');
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    select: {
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Car Photo:</label>
          <input type="file" name="carPhoto" onChange={handleFileChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Car Name:</label>
          <input type="text" name="carName" value={carDetails.carName} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Fuel Type:</label>
          <select name="fuelType" value={carDetails.fuelType} onChange={handleChange} required style={styles.select}>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Person Capacity:</label>
          <select name="personCapacity" value={carDetails.personCapacity} onChange={handleChange} required style={styles.select}>
            {[...Array(7).keys()].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Car Type:</label>
          <select name="carType" value={carDetails.carType} onChange={handleChange} required style={styles.select}>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Pickup Location:</label>
          <select name="pickupLocation" value={carDetails.pickupLocation} onChange={handleChange} required style={styles.select}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price (₹):</label>
          <input
            type="text"
            name="price"
            value={carDetails.price}
            onChange={handlePriceChange}
            required
            style={styles.input}
            placeholder="e.g., 1,00,000"
          />
        </div>
        <button type="submit" style={styles.button}>Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;


