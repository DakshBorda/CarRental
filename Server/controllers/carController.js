
// const Car = require('../models/carModel');

// // Function to handle adding a new car
// const addCar = async (req, res) => {
//   try {
//     const { carName, fuelType, personCapacity, carType, pickupLocation, price } = req.body;
//     const carPhoto = req.file.path; // Get the path of the uploaded file

//     const newCar = new Car({
//       carPhoto,
//       carName,
//       fuelType,
//       personCapacity,
//       carType,
//       pickupLocation,
//       price,
//     });

//     await newCar.save();
//     res.status(201).json({ msg: 'Car added successfully!' });
//   } catch (error) {
//     console.error('Error adding car:', error);
//     res.status(500).json({ msg: 'Failed to add car' });
//   }
// };

// module.exports = {
//   addCar,
// };

// controllers/carController.js


// Function to handle adding a new car
// controllers/carController.js
const Car = require('../models/carModel'); // Assuming you have a Car model defined

const addCar = async (req, res) => {
  try {
    const { carName, fuelType, personCapacity, carType, pickupLocation, price } = req.body;
    const carPhoto = req.file.path.replace(/\\/g, '/'); // Normalize path

    const newCar = new Car({
      carPhoto,
      carName,
      fuelType,
      personCapacity,
      carType,
      pickupLocation,
      price,
    });

    await newCar.save();
    res.status(201).json({ msg: 'Car added successfully!' });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ msg: 'Failed to add car' });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ msg: 'Failed to fetch cars' });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id); // Use ID from request parameters
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ msg: 'Failed to fetch car' });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Car deleted successfully!' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ msg: 'Failed to delete car' });
  }
};

module.exports = {
  addCar,
  getCars,
  getCarById, // Export the getCarById function
  deleteCar,
};

