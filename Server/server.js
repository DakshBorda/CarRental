
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const nodemailer = require('nodemailer');
const path = require('path');

// Import routes
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/carRoutes'); // Import the car routes
const bookingRoutes = require('./routes/bookingRoutes'); // Ensure this route file exists

const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent with requests
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for sessions
app.use(session({
  secret: 'xyz',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/Drive',
    ttl: 10 * 60 // 10 minutes
  }),
  cookie: { maxAge: 600000 } // 10 minutes
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Drive', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a simple route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api', bookingRoutes);
// Use car routes for handling car-related requests
app.use('/api/admin', carRoutes); // Make sure this matches your frontend request URL

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dakshborada@gmail.com', // Replace with your email
    pass: 'qnsr ltau dfaj toxl' // Replace with your email password
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // The user's email address
    to: 'dakshborada@gmail.com', // The recipient's email address (your email)
    subject: `Contact Form Submission from ${name}`, // Email subject, including the user's name
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Email body, including the user's details
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const path = require('path');

// // Import routes
// const userRoutes = require('./routes/users'); // Ensure this route file exists
// const carRoutes = require('./routes/carRoutes'); // Ensure this route file exists
// const bookingRoutes = require('./routes/bookingRoutes'); // Ensure this route file exists

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware for CORS
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// // Middleware for parsing JSON bodies
// app.use(bodyParser.json());

// // Middleware for sessions
// app.use(session({
//   secret: 'xyz', // Change this in production
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: 'mongodb://localhost:27017/Drive',
//     ttl: 10 * 60 // Session expiration in seconds
//   }),
//   cookie: { maxAge: 600000 } // Cookie expiration
// }));

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Drive', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected successfully');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB:', err);
//   process.exit(1);
// });

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Define a simple route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running...');
// });

// // Use routes
// app.use('/api/users', userRoutes);
// app.use('/api/admin', carRoutes);
// app.use('/api', bookingRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
