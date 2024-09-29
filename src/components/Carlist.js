
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CarList.css'; // Assuming this is where the CSS is stored
// import SearchBar from './searchbar';

// const CarList = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/cars')
//       .then(response => {
//         setCars(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the car data!', error);
//       });
//   }, []);

//   return (
//     <div className="car-list">
//       <h1>Find Your Perfect Car</h1>
//       <div>
//         <SearchBar />
//       </div>
//       <div className="available-cars">
//         {cars.map(car => (
//           <div key={car._id} className="car-item">
//             <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} className="car-image" />
//             <div className="car-item-details">
//               <h2>{car.carName}</h2>
//               <p>{car.fuelType} | {car.personCapacity} Seats | {car.carType}</p>
//               <p>{car.pickupLocation}</p>
//               <p><strong>Price:</strong> {car.price}</p>
//             </div>
//             <a href={`/book-now/${car._id}`} className="view-details">Book Now</a>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './searchbar';
import { Link } from 'react-router-dom';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    carName: '',
    fuelType: '',
    personCapacity: '',
    carType: '',
    price: '',
    pickupLocation: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/cars')
      .then(response => {
        setCars(response.data);
        setFilteredCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterCars(newFilters);
  };

  const filterCars = (filters) => {
    const filtered = cars.filter(car => {
      return (
        (!filters.carName || car.carName.toLowerCase().includes(filters.carName.toLowerCase())) &&
        (!filters.fuelType || car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()) &&
        (!filters.personCapacity || car.personCapacity === Number(filters.personCapacity)) &&
        (!filters.carType || car.carType.toLowerCase().includes(filters.carType.toLowerCase())) &&
        (!filters.price || car.price <= Number(filters.price)) &&
        (!filters.pickupLocation || car.pickupLocation.toLowerCase().includes(filters.pickupLocation.toLowerCase()))
      );
    });
    setFilteredCars(filtered);
  };

  return (
    <div className="car-list">
      <div className="filters-section">
        <SearchBar onFilterChange={handleFilterChange} />
      </div>
      <div className="available-cars">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car._id} className="car-item">
              <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} className="car-image" />
              <div className="car-item-details">
                <h2>{car.carName}</h2>
                <p>{car.fuelType} | {car.personCapacity} Seats | {car.carType}</p>
                <p>{car.pickupLocation}</p>
                <p><strong>Price:</strong> {car.price}</p>
              </div>
              <Link to={`/book-now/${car._id}`} className="view-details">Book Now</Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CarList;
