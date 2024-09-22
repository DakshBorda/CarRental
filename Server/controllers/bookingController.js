const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');

exports.createBooking = async (req, res) => {
  try {
    const {
      carId,
      name,
      phone,
      drivingLicense,
      aadhar,
      address,
      pickupDate,
      returnDate,
      message,
      bdate
    } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).json({ error: 'Car not found' });
    }

    const newBooking = new Booking({
      carId,
      name,
      phone,
      drivingLicense,
      aadhar,
      address,
      pickupDate,
      returnDate,
      message,
      bdate
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};
