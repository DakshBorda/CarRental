// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const sendOTP = require('../utils/email');

// // Generate OTP
// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// // Register a new user
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Generate and send OTP
//     const otp = generateOTP();
//     req.session.otp = otp;
//     req.session.email = email;
//     req.session.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
//     sendOTP(email, otp);

//     res.status(200).json({ msg: 'OTP sent to email' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Verify OTP and complete registration
// router.post('/verify-otp', async (req, res) => {
//   const { email, otp, name, password } = req.body;

//   try {
//     // Validate session data
//     if (!req.session.otp || !req.session.email || !req.session.otpExpiry) {
//       return res.status(400).json({ msg: 'OTP data not found in session' });
//     }

//     // Check if the OTP is correct and has not expired
//     if (req.session.otp !== otp || req.session.email !== email || Date.now() > req.session.otpExpiry) {
//       return res.status(400).json({ msg: 'Invalid or expired OTP' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       isAdmin: false, // By default, a new user is not an admin
//     });

//     // Save the user to the database
//     await user.save();

//     // Clear the session
//     req.session.otp = null;
//     req.session.email = null;
//     req.session.otpExpiry = null;

//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Log the user object for debugging
//     console.log(user); // Check if isAdmin is correctly set

//     // Create session and set admin flag
//     req.session.userId = user._id;
//     req.session.isAdmin = user.isAdmin; // Store admin status in session

//     res.status(200).json({ 
//       msg: 'Login successful',
//       isAdmin: user.isAdmin // Send admin status in response for front-end handling
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Middleware to check if user is an admin
// const requireAdmin = (req, res, next) => {
//   if (!req.session.isAdmin) {
//     return res.status(403).json({ msg: 'Access denied. Admins only.' });
//   }
//   next();
// };

// // Protected routes for admin actions (e.g., adding, updating, deleting cars)
// router.post('/admin/add-car', requireAdmin, async (req, res) => {
//   // Logic to add a car
//   res.status(200).json({ msg: 'Car added successfully' });
// });

// router.put('/admin/update-car/:id', requireAdmin, async (req, res) => {
//   // Logic to update a car
//   res.status(200).json({ msg: 'Car updated successfully' });
// });

// router.delete('/admin/delete-car/:id', requireAdmin, async (req, res) => {
//   // Logic to delete a car
//   res.status(200).json({ msg: 'Car deleted successfully' });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendOTP = require('../utils/email'); // Ensure this utility is correctly implemented

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate and send OTP
    const otp = generateOTP();
    req.session.otp = otp;
    req.session.email = email;
    req.session.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    sendOTP(email, otp);

    res.status(200).json({ msg: 'OTP sent to email' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify OTP and complete registration
router.post('/verify-otp', async (req, res) => {
  const { email, otp, name, password } = req.body;

  try {
    // Validate session data
    if (!req.session.otp || !req.session.email || !req.session.otpExpiry) {
      return res.status(400).json({ msg: 'OTP data not found in session' });
    }

    // Check if the OTP is correct and has not expired
    if (req.session.otp !== otp || req.session.email !== email || Date.now() > req.session.otpExpiry) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // By default, a new user is not an admin
    });

    // Save the user to the database
    await user.save();

    // Clear the session
    req.session.otp = null;
    req.session.email = null;
    req.session.otpExpiry = null;

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create session and set admin flag
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin; // Store admin status in session

    res.status(200).json({ 
      msg: 'Login successful',
      isAdmin: user.isAdmin // Send admin status in response for front-end handling
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Check if user is admin
router.get('/check-admin', (req, res) => {
  if (req.session.userId && req.session.isAdmin) {
    res.status(200).json({ isAdmin: true });
  } else {
    res.status(403).json({ isAdmin: false });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ msg: 'Logout failed' });
    }
    res.status(200).json({ msg: 'Logged out successfully' });
  });
});
router.get('/check-login', (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ isLoggedIn: true, isAdmin: req.session.isAdmin || false });
  } else {
    return res.status(200).json({ isLoggedIn: false, isAdmin: false });
  }
});
router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const user = await User.findById(req.session.userId).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
