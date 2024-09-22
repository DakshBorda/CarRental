
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import AboutUs from './components/AboutUs';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import ContactForm from './components/ContactForm';
// import Carlist from './components/Carlist';
// import AdminPanel from './components/AdminPanel';

// import './App.css';
// import axios from 'axios';


// const ProtectedRoute = ({ isAdmin, children }) => {
//   return isAdmin ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   const [isAdmin, setIsAdmin] = React.useState(false);

//   React.useEffect(() => {
//     const checkAdminStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/check-admin', {
//           withCredentials: true,
//         });
//         setIsAdmin(response.data.isAdmin);
//       } catch (error) {
//         console.error('Error checking admin status:', error);
//         setIsAdmin(false);
//       }
//     };

//     checkAdminStatus();
//   }, []);

//   return (
//     <Router>
//       <div className="container">
//         <header className="header">
//           <div className="logo">DriveNow</div>
//           <nav className="navbar">
//             <Link to="/">Home</Link>
//             <Link to="/aboutus">About Us</Link>
//             <Link to="/carlist">Car Listings</Link>
//             <Link to="/contact">Contact Us</Link>
//             <Link to="/login" className="login-icon">Login</Link>
//           </nav>
//         </header>
        
//         <main className="main">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/aboutus" element={<AboutUs />} />
//             <Route path="/carlist" element={<Carlist />} />
//             <Route path="/contact" element={<ContactForm />} />
//             <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} /> {/* Pass setIsAdmin */}
//             <Route path="/signup" element={<SignUp />} />
           

//             {/* Protect the admin routes */}
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute isAdmin={isAdmin}>
//                   <AdminPanel />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ContactForm from './components/ContactForm';
import CarList from './components/Carlist';
import AdminPanel from './components/AdminPanel';
import BookNow from './components/BookNow'; 
// import ProfilePage  from './components/profile';
// Importing BookNow component

import './App.css';
import axios from 'axios';

const ProtectedRoute = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/login" />;
};

const App = ({ user }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/check-admin', {
          withCredentials: true,
        });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="logo">DriveNow</div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/aboutus">About Us</Link>
            {/* <Link to="/aboutus">About Us</Link> */}
            <Link to="/carlist">Car Listings</Link>
            <Link to="/contact">Contact Us</Link>
            {/* <Link to="/login" className="login-icon">Login</Link> */}
            {user ? (
          <>
            <Link to="/profile" className="profile-link">
              <img 
                src={user.profilePicture || defaultProfileIcon} 
                alt="Profile Icon" 
                className="profile-icon" 
              />
              Profile
            </Link>
            <Link to="/logout" className="logout-icon">Logout</Link>
          </>
        ) : (
          <Link to="/login" className="login-icon">Login</Link>
        )}
          </nav>
        </header>
        
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/carlist" element={<CarList />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/book-now/:id" element={<BookNow />} />

            {/* Dynamic Route for BookNow */}
            <Route path="/book-now/:carId" element={<BookNow />} />

            {/* Admin route with protection */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAdmin={isAdmin}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;



