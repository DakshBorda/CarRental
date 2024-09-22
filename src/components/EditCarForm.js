import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    carName: '',
    fuelType: '',
    personCapacity: '',
    carType: '',
    price: '',
    carPhoto: '',
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/car/${id}`);
        setCarData(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/car/${id}`, carData);
      alert('Car updated successfully!');
      navigate('/admin-car-list'); // Redirect after update
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to update car');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="carName"
        value={carData.carName}
        onChange={handleChange}
        placeholder="Car Name"
        required
      />
      <input
        type="text"
        name="fuelType"
        value={carData.fuelType}
        onChange={handleChange}
        placeholder="Fuel Type"
        required
      />
      <input
        type="number"
        name="personCapacity"
        value={carData.personCapacity}
        onChange={handleChange}
        placeholder="Capacity"
        required
      />
      <input
        type="text"
        name="carType"
        value={carData.carType}
        onChange={handleChange}
        placeholder="Car Type"
        required
      />
      <input
        type="number"
        name="price"
        value={carData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="carPhoto"
        value={carData.carPhoto}
        onChange={handleChange}
        placeholder="Car Photo URL"
        required
      />
      <button type="submit">Update Car</button>
    </form>
  );
};

export default EditCarForm;
