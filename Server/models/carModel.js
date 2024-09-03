
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carPhoto: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'CNG'],
    required: true,
  },
  personCapacity: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    enum: ['Sedan', 'Hatchback', 'SUV'],
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
