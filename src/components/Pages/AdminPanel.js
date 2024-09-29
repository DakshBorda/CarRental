
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AddCar from './AddCar';

// const AdminPanel = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check admin status when component loads
//     const checkAdminStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/check-admin', {
//           withCredentials: true,
//         });
//         if (response.data.isAdmin) {
//           setIsAdmin(true);
//         } else {
//           navigate('/login'); // Redirect to login if not an admin
//         }
//       } catch (error) {
//         console.error('Error checking admin status:', error);
//         navigate('/login'); // Redirect to login on error
//       }
//     };

//     checkAdminStatus();
//   }, [navigate]);

//   return (
//     <div style={{ padding: '2rem' }}>
//       {isAdmin ? (
//         <>
//           <h1>Welcome to the Admin Panel</h1>
//           <p>Manage your car listings here.</p>
//           <AddCar /> {/* Render the Add Car Form only if admin */}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddCar from './AddCar';
import AdminCarList from './AdminCarList'; // Import AdminCarList component

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin status when component loads
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/check-admin', {
          withCredentials: true,
        });
        if (response.data.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/login'); // Redirect to login if not an admin
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    checkAdminStatus();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      {isAdmin ? (
        <>
          <h1>Welcome to the Admin Panel</h1>
          <p>Manage your car listings here.</p>
          <AddCar /> {/* Render the Add Car Form */}
          <AdminCarList /> {/* Render the Admin Car List */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminPanel;


