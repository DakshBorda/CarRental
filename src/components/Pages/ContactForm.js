import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ContactForm.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/contact', {
        name,
        email,
        message
      });

      if (response.status === 200) {
        setStatus('Message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error sending message');
    }
  };

  return (
    <div className="contact-form">
      <h2>Send us a message</h2>
      <p>If you have any questions or need assistance related to car rentals, feel free to reach out. we are here to help and it's our pleasure to assist you.</p>
    
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box message-box">
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="button">
          <input type="submit" value="Send" />
        </div>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default ContactForm;
