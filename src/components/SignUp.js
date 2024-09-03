import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      }, { withCredentials: true });
      console.log(response.data);
      setIsOtpSent(true);
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error.response?.data?.msg || 'Error registering user');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
        email,
        otp,
        name,
        password,
      }, { withCredentials: true });
      console.log(response.data);
      alert('User registered successfully');
      setIsVerified(true);
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert(error.response?.data?.msg || 'Error verifying OTP');
    }
  };

  const styles = {
    signupContainer: {
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
      fontWeight: '600',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1.125rem',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    link: {
      display: 'block',
      marginTop: '1rem',
      textAlign: 'center',
      color: '#007bff',
      textDecoration: 'none',
    },
    success: {
      marginTop: '1rem',
      color: 'green',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.signupContainer}>
      <h2 style={styles.header}>Sign Up</h2>
      {!isOtpSent ? (
        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div style={styles.formGroup}>
            <label style={styles.label}>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Verify OTP</button>
        </form>
      )}
      <Link to="/login" style={styles.link}>Already have an account? Login</Link>
      {isVerified && <p style={styles.success}>User registered successfully!</p>}
    </div>
  );
}

export default SignUp;