
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const nodemailer = require('nodemailer');
// const path = require('path');

// // Import routes
// const userRoutes = require('./routes/users');
// const carRoutes = require('./routes/carRoutes'); // Import the car routes

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware for CORS
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // Allow cookies to be sent with requests
// }));

// // Middleware for parsing JSON bodies
// app.use(bodyParser.json());

// // Middleware for sessions
// app.use(session({
//   secret: 'xyz',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: 'mongodb://localhost:27017/Drive',
//     ttl: 10 * 60 // 10 minutes
//   }),
//   cookie: { maxAge: 600000 } // 10 minutes
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

// // Use user routes
// app.use('/api/users', userRoutes);

// // Use car routes for handling car-related requests
// app.use('/api/admin', carRoutes); // Make sure this matches your frontend request URL

// // Email configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '22cs011@charusat.edu.in', // Replace with your email
//     pass: 'xcpm czao bykq tgay' // Replace with your email password
//   }
// });

// // Contact form endpoint
// app.post('/api/contact', (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: email, // The user's email address
//     to: '22cs011@charusat.edu.in', // The recipient's email address (your email)
//     subject: `Contact Form Submission from ${name}`, // Email subject, including the user's name
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Email body, including the user's details
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).send('Email sent');
//     }
//   });
// });

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
// server.js
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
    mongoUrl: 'mongodb+srv://22cs011:5445@cluster0.tjkub.mongodb.net/<yourDatabase>?authSource=admin&authMechanism=SCRAM-SHA-1',
    ttl: 10 * 60 // 10 minutes
  }),
  cookie: { maxAge: 600000 } // 10 minutes
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://22cs011:5445@cluster0.tjkub.mongodb.net/<yourDatabase>?authSource=admin&authMechanism=SCRAM-SHA-1', {
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

// Use car routes for handling car-related requests
app.use('/api/admin', carRoutes); // Make sure this matches your frontend request URL

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '22cs011@charusat.edu.in', // Replace with your email
    pass: 'xcpm czao bykq tgay' // Replace with your email password
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // The user's email address
    to: '22cs011@charusat.edu.in', // The recipient's email address (your email)
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
