
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
// import './CarList.css'; // Assuming this is where the CSS is stored
import SearchBar from './searchbar';
import { Link } from 'react-router-dom';
import'./CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
  }, []);

  return (
    <div className="car-list">
      <h1>Find Your Perfect Car  drive now</h1>
      <div>
        <SearchBar />
      </div>
      <div className="available-cars">
        {cars.length > 0 ? (
          cars.map(car => (
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
