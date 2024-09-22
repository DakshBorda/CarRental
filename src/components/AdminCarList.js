
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminCarList = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/cars'); // Adjust this URL if needed
//         setCars(response.data);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       }
//     };

//     fetchCars();
//   }, []);

//   const deleteCar = async (carId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/car/${carId}`); // API call to delete the car
//       setCars(cars.filter(car => car._id !== carId)); // Update the state to remove the deleted car
//       alert('Car deleted successfully');
//     } catch (error) {
//       console.error('Error deleting car:', error);
//       alert('Failed to delete car');
//     }
//   };

//   const editCar = (carId) => {
//     console.log('Editing car with ID:', carId);
//     alert(`Edit functionality for car ID: ${carId} is not implemented yet.`);
//   };

//   // Inline CSS styles
//   const styles = {
//     container: {
//       padding: '20px',
//       backgroundColor: '#f9f9f9',
//       borderRadius: '5px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//       marginTop: '30px',
//     },
//     carList: {
//       listStyleType: 'none',
//       padding: 0,
//       margin: 0,
//     },
//     carItem: {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '15px',
//       backgroundColor: '#fff',
//       border: '1px solid #ddd',
//       borderRadius: '5px',
//       boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//       padding: '15px',
//       boxSizing: 'border-box',
//     },
//     carImage: {
//       width: '200px', // Larger photo size
//       height: 'auto',
//       borderRadius: '5px',
//       marginRight: '15px', // Space between image and details
//     },
//     carDetails: {
//       flexGrow: 1,
//     },
//     carDetailsTitle: {
//       margin: '0 0 5px',
//       fontSize: '1.2em',
//     },
//     carDetailsText: {
//       margin: '3px 0',
//       fontSize: '0.9em',
//       color: '#555',
//     },
//     carActions: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     button: {
//       border: 'none',
//       padding: '8px 12px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s ease',
//       width: '100px', // Fixed width for consistent button size
//       textAlign: 'center',
//       marginBottom: '5px', // Space between buttons
//     },
//     editButton: {
//       backgroundColor: '#007bff',
//       color: '#fff',
//     },
//     deleteButton: {
//       backgroundColor: '#ff4d4d',
//       color: '#fff',
//     },
//     icon: {
//       marginRight: '5px',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Admin Car List</h2>
//       {cars.length > 0 ? (
//         <ul style={styles.carList}>
//           {cars.map(car => (
//             <li 
//               key={car._id} 
//               style={styles.carItem}
//               onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
//             >
//               <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} style={styles.carImage} />
//               <div style={styles.carDetails}>
//                 <h3 style={styles.carDetailsTitle}>{car.carName}</h3>
//                 <p style={styles.carDetailsText}>Fuel Type: {car.fuelType}</p>
//                 <p style={styles.carDetailsText}>Capacity: {car.personCapacity} persons</p>
//                 <p style={styles.carDetailsText}>Type: {car.carType}</p>
//                 <p style={styles.carDetailsText}>Location: {car.pickupLocation}</p>
//                 <p style={styles.carDetailsText}>Price: {car.price}</p>
//               </div>
//               <div style={styles.carActions}>
//                 <button 
//                   style={{ ...styles.button, ...styles.editButton }}
//                   onClick={() => editCar(car._id)}
//                 >
//                   <i className="fas fa-edit" style={styles.icon}></i> Edit
//                 </button>
//                 <button 
//                   style={{ ...styles.button, ...styles.deleteButton }}
//                   onClick={() => deleteCar(car._id)}
//                 >
//                   <i className="fas fa-trash-alt" style={styles.icon}></i> Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No cars available.</p>
//       )}
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/cars'); // Adjust this URL if needed
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/car/${carId}`); // API call to delete the car
      setCars(cars.filter(car => car._id !== carId)); // Update the state to remove the deleted car
      alert('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  };

  const editCar = (carId) => {
    console.log('Editing car with ID:', carId);
    alert(`Edit functionality for car ID: ${carId} is not implemented yet.`);
  };

  // Inline CSS styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginTop: '30px',
    },
    carList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      justifyContent: 'center',
      padding: 0,
      listStyleType: 'none',
      margin: 0,
    },
    carItem: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      boxSizing: 'border-box',
      transition: 'transform 0.2s',
      width: 'calc(50% - 15px)', // Two cards per row with gap
      maxWidth: 'calc(50% - 15px)', // Prevent card from exceeding its container width
      position: 'relative', // Required for absolute positioning of actions
    },
    carItemHover: {
      transform: 'translateY(-2px)',
    },
    carImage: {
      width: '231px', // Increased photo size by 5%
      height: '138px', // Adjust height for better aspect ratio
      objectFit: 'cover', // Ensure image covers the area
      borderRadius: '5px',
      marginRight: '20px', // Space between image and content
      flexShrink: 0, // Prevent image from shrinking
    },
    carContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Center content vertically
      margin: '0 15px', // Consistent margin on both sides
    },
    carName: {
      margin: '0',
      fontSize: '1.4em',
      fontWeight: 'bold',
      marginBottom: '10px', // Space below the name
    },
    carDetails: {
      marginBottom: '10px', // Space between details and actions
    },
    carDetailsText: {
      margin: '5px 0',
      fontSize: '0.9em',
      color: '#555',
    },
    carActions: {
      position: 'absolute',
      right: '15px', // Align buttons to the right side
      top: '50%',
      transform: 'translateY(-50%)', // Center buttons vertically
      display: 'flex',
      flexDirection: 'column',
      gap: '10px', // Space between buttons
    },
    button: {
      border: 'none',
      padding: '8px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '100px', // Fixed width for consistent button size
      textAlign: 'center',
    },
    editButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    deleteButton: {
      backgroundColor: '#ff4d4d',
      color: '#fff',
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker color for hover
    },
    deleteButtonHover: {
      backgroundColor: '#cc0000', // Darker color for hover
    },
    icon: {
      marginRight: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Admin Car List</h2>
      {cars.length > 0 ? (
        <ul style={styles.carList}>
          {cars.map(car => (
            <li 
              key={car._id} 
              style={styles.carItem}
              onMouseOver={(e) => e.currentTarget.style.transform = styles.carItemHover.transform}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <img src={`http://localhost:5000/${car.carPhoto}`} alt={car.carName} style={styles.carImage} />
              <div style={styles.carContent}>
                <h3 style={styles.carName}>{car.carName}</h3>
                <div style={styles.carDetails}>
                  <p style={styles.carDetailsText}>Fuel Type: {car.fuelType}</p>
                  <p style={styles.carDetailsText}>Capacity: {car.personCapacity} persons</p>
                  <p style={styles.carDetailsText}>Type: {car.carType}</p>
                  <p style={styles.carDetailsText}>Location: {car.pickupLocation}</p>
                  <p style={styles.carDetailsText}>Price: {car.price}</p>
                </div>
              </div>
              <div style={styles.carActions}>
                <button 
                  style={{ ...styles.button, ...styles.editButton }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.editButton.backgroundColor}
                  onClick={() => editCar(car._id)}
                >
                  <i className="fas fa-edit" style={styles.icon}></i> Edit
                </button>
                <button 
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor}
                  onClick={() => deleteCar(car._id)}
                >
                  <i className="fas fa-trash-alt" style={styles.icon}></i> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default AdminCarList;



