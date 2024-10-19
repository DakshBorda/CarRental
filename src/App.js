
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Pages/Home';
// import AboutUs from './components/AboutUs';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import ContactForm from './components/Pages/ContactForm';
import CarList from './components/Pages/Carlist';
import AdminPanel from './components/Pages/AdminPanel';
import BookNow from './components/Pages/BookNow';
import Profile from './components/Pages/Profile';
import EditCarForm from './components/Pages/EditCarForm';
import './App.css';
import axios from 'axios';

const ProtectedRoute = ({ isLoggedIn, isAdmin, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const loggedIn = localStorage.getItem('isLoggedIn');

    if (storedUser && loggedIn === 'true') {
      setIsLoggedIn(true);
      setIsAdmin(JSON.parse(storedUser).isAdmin);
    } else {
      const checkLoginStatus = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/check-login', {
            withCredentials: true,
          });
          setIsLoggedIn(response.data.isLoggedIn);
          setIsAdmin(response.data.isAdmin);
        } catch (error) {
          console.error('Error checking login status:', error);
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      };

      checkLoginStatus();
    }
  }, []);



  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="logo">DriveNow</div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            {/* <Link to="/aboutus">About Us</Link> */}
            <Link to="/carlist">Car Listings</Link>
            <Link to="/contact">Contact Us</Link>

            {isLoggedIn ? (
              <div className="user-controls">
                <Link to="/profile" className="profile-icon">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
              </div>
            ) : (
              <Link to="/login" className="login-icon">Login</Link>
            )}
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/aboutus" element={<AboutUs />} /> */}
            <Route path="/carlist" element={<CarList />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/book-now/:id" element={<BookNow />} />
            <Route path="/edit-car/:id" element={<EditCarForm />} />
            <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
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
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Home from './components/Pages/Home';
// import Login from './components/Pages/Login';
// import SignUp from './components/Pages/SignUp';
// import ContactForm from './components/Pages/ContactForm';
// import CarList from './components/Pages/Carlist';
// import AdminPanel from './components/Pages/AdminPanel';
// import BookNow from './components/Pages/BookNow';
// import Profile from './components/Pages/Profile';
// import EditCarForm from './components/Pages/EditCarForm';
// import './App.css';
// import axios from 'axios';

// const ProtectedRoute = ({ isLoggedIn, isAdmin, children }) => {
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   const [isAdmin, setIsAdmin] = React.useState(false);
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   React.useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const loggedIn = localStorage.getItem('isLoggedIn');

//     if (storedUser && loggedIn === 'true') {
//       setIsLoggedIn(true);
//       setIsAdmin(JSON.parse(storedUser).isAdmin);
//     } else {
//       const checkLoginStatus = async () => {
//         try {
//           const response = await axios.get('http://localhost:5000/api/users/check-login', {
//             withCredentials: true,
//           });
//           setIsLoggedIn(response.data.isLoggedIn);
//           setIsAdmin(response.data.isAdmin);
//         } catch (error) {
//           console.error('Error checking login status:', error);
//           setIsLoggedIn(false);
//           setIsAdmin(false);
//         }
//       };

//       checkLoginStatus();
//     }
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <Router>
//       <div className="container">
//         <header className="header">
//           <div className="logo">DriveNow</div>
//           <nav className={`navbar ${isMobileMenuOpen ? 'open' : ''}`}>
//             <div className="menu-toggle" onClick={toggleMobileMenu}>
//               {isMobileMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
//             </div>
//             <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
//               <Link to="/" onClick={toggleMobileMenu}>Home</Link>
//               <Link to="/carlist" onClick={toggleMobileMenu}>Car Listings</Link>
//               <Link to="/contact" onClick={toggleMobileMenu}>Contact Us</Link>
//               {isLoggedIn ? (
//                 <div className="user-controls">
//                   <Link to="/profile" className="profile-icon" onClick={toggleMobileMenu}>
//                     <FontAwesomeIcon icon={faUser} />
//                   </Link>
//                 </div>
//               ) : (
//                 <Link to="/login" className="login-icon" onClick={toggleMobileMenu}>Login</Link>
//               )}
//             </div>
//           </nav>
//         </header>

//         <main className="main">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/carlist" element={<CarList />} />
//             <Route path="/contact" element={<ContactForm />} />
//             <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/book-now/:id" element={<BookNow />} />
//             <Route path="/edit-car/:id" element={<EditCarForm />} />
//             <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
//                   <AdminPanel />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;
