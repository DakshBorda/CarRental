
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './searchbar';
import { Link } from 'react-router-dom';
import '../Styles/CarList.css';

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
                <p><strong>₹</strong>{car.price}/day</p>
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








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../Styles/CarList.css';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [filters, setFilters] = useState({
//     carName: '',
//     fuelType: '',
//     personCapacity: '',
//     carType: '',
//     price: '',
//     pickupLocation: '',
//   });

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/cars')
//       .then(response => {
//         setCars(response.data);
//         setFilteredCars(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the car data!', error);
//       });
//   }, []);

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   const filterCars = () => {
//     const filtered = cars.filter(car => {
//       return (
//         (!filters.carName || car.carName.toLowerCase().includes(filters.carName.toLowerCase())) &&
//         (!filters.fuelType || car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()) &&
//         (!filters.personCapacity || car.personCapacity === Number(filters.personCapacity)) &&
//         (!filters.carType || car.carType.toLowerCase().includes(filters.carType.toLowerCase())) &&
//         (!filters.price || car.price <= Number(filters.price)) &&
//         (!filters.pickupLocation || car.pickupLocation.toLowerCase().includes(filters.pickupLocation.toLowerCase()))
//       );
//     });
//     setFilteredCars(filtered);
//   };

//   useEffect(() => {
//     filterCars();
//   }, [filters]);

//   return (
//     <div className="car-list">
//       <div className="filters-section">
//         <h2>Filters</h2>
//         <div className="filter">
//           <label>Brand:</label>
//           <select name="carName" onChange={handleFilterChange}>
//             <option value="">All</option>
//             <option value="Fossil">Fossil</option>
//             <option value="Timex">Timex</option>
//             <option value="Movado">Movado</option>
//           </select>
//         </div>
//         <div className="filter">
//           <label>Fuel Type:</label>
//           <select name="fuelType" onChange={handleFilterChange}>
//             <option value="">All</option>
//             <option value="Petrol">Petrol</option>
//             <option value="Diesel">Diesel</option>
//           </select>
//         </div>
//         {/* Add more filters as necessary */}
//       </div>
//       <div className="car-grid">
//         {filteredCars.length > 0 ? (
//           filteredCars.map(car => (
//             <div key={car._id} className="car-card">
//               <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} className="car-image" />
//               <div className="car-info">
//                 <h3>{car.carName}</h3>
//                 <p>{car.fuelType} | {car.personCapacity} Seats</p>
//                 <p>{car.pickupLocation}</p>
//                 <p><strong>${car.price}</strong></p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="loading">Loading...</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarList;
