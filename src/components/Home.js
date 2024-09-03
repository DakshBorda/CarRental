// src/Home.js
import React from 'react';
// import Header from './components/Header';
// import SearchBar from './components/SearchBar';
import CarCard from './CarCard'; 
//  Import CarCard component
import './Home.css';

const Home = () => {
  const cars = [
    {
      name: 'Mercedes',
      // year: '2022',
      image: 'mrc.avif',
      rating: 5,
      // reviews: '25k',
      location: 'Ahmedabad',
      seats: 4,
      mileage: 29.41,
      condition: '90%',
      price: '4015.57'
    },
    {
      name: 'BMW',
      // year: '2020',
      image: 'bmw.avif',
      rating: 4,
      // reviews: '12k',
      location: 'Vadodara',
      seats: 4,
      mileage: 25.55,
      condition: '100%',
      price: '7845.57'
    },
    {
      name: 'Mustang',
      // year: '2019',
      image: 'mustang.avif',
      rating: 4,
      // reviews: '5k',
      location: 'Vadodara',
      seats: 4,
      mileage: 5.41,
      condition: '100%',
      price: '3118.99'
    },
    {
      name: 'Ford SUV',
      // year: '2019',
      image: 'fordsuv.avif',
      rating: 4,
      // reviews: '5k',
      location: 'Vadodara',
      seats: 4,
      mileage: 5.41,
      condition: '100%',
      price: '3118.99'
    },
    {
      name: 'Lamborgini',
      // year: '2019',
      image: 'lamborgini.avif',
      rating: 3.5,
      // reviews: '5k',
      location: 'Vadodara',
      seats: 2,
      mileage: 5.41,
      condition: '100%',
      price: '3118.99'
    },
    {
      name: 'Hyundai i20',
      // year: '2019',
      image: 'i20.avif',
      rating: 4.5,
      // reviews: '5k',
      location: 'Vadodara',
      seats: 4,
      mileage: 5.41,
      condition: '100%',
      price: '3118.99'
    },
    // {
    //   name: 'Hyundai i20',
    //   year: '2019',
    //   image: 'hyundai.jpg',
    //   rating: 4,
    //   reviews: '5k',
    //   location: 'Vadodara',
    //   seats: 4,
    //   mileage: 5.41,
    //   condition: '100%',
    //   price: '3118.99'
    // }
  ];

  return (
    <div className="home">
      <header></header>
      <main className="main">
        <div className="hero">
          {/* <img src={"home.png"} alt="Car" className="hero-image" /> */}
          <h1 className="hero-text">Find the Perfect Ride with DriveNow</h1>
          {/* <div className="search-bar">
            <input type="text" placeholder="Search for a car" />
            <button>Search</button>
          </div> */}
        </div>

      <div className="car-listings">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />  // Use CarCard component
        ))}
      </div>
      </main>
    </div>
  );
}

export default Home;
