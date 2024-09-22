
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { addCar, getCars } = require('../controllers/carController');

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Set the upload destination folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
//   },
// });

// const upload = multer({ storage: storage });

// // Route to add a car
// router.post('/add-car', upload.single('carPhoto'), addCar);

// // Route to get all cars
// router.get('/cars', getCars);

// module.exports = router;
// routes/carRoutes.js
// routes/carRoutes.js
// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { addCar, getCars, getCarById, deleteCar, updateCar } = require('../controllers/carController');


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the upload destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage: storage });

// Route to add a car
router.post('/add-car', upload.single('carPhoto'), addCar);

// Route to get all cars
router.get('/cars', getCars);

// Route to get a specific car by ID
router.get('/cars/:id', getCarById); // Add this route

// Route to delete a car by ID
router.delete('/car/:id', deleteCar);

// Route to update a car by ID
router.put('/cars/:id', upload.single('carPhoto'), updateCar);

router.put('/api/admin/car/:id', async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, { new: true });

    if (!updatedCar) {
      return res.status(404).send('Car not found');
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
