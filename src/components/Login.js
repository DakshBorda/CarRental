import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAdmin }) { // Receive setIsAdmin as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        { withCredentials: true }
      );

      alert(response.data.msg);

      if (response.data.isAdmin) {
        setIsAdmin(true); // Set admin status
        navigate('/admin'); // Redirect to the admin panel
      } else {
        navigate('/'); // Redirect to the homepage if not an admin
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.msg || 'Error logging in');
    }
  };

  const styles = {
    container: {
      maxWidth: '450px',
      margin: '5% auto',
      padding: '2rem',
      border: '1px solid #e1e1e1',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '1.5rem',
      fontSize: '2rem',
      color: '#333',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    link: {
      display: 'block',
      marginTop: '1rem',
      fontSize: '0.875rem',
      textAlign: 'center',
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
        <Link to="/signup" style={styles.link}>Don't have an account? Register here</Link>
      </form>
    </div>
  );
}

export default Login;
