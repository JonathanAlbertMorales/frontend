import React, { useState } from 'react';
import './App.css';

function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const formatPhoneNumber = (value) => {
    let phoneValue = value.replace(/\D/g, '');

    if (phoneValue.length > 10) {
      phoneValue = phoneValue.slice(0, 10);
    }

    let formattedPhoneNumber = '';
  
    if (phoneValue.length >= 4) {
      formattedPhoneNumber += '(' + phoneValue.substring(0, 3) + ') ' + phoneValue.substring(3, 6);
    }
    if (phoneValue.length >= 7) {
      formattedPhoneNumber += '-' + phoneValue.substring(6, 10);
    }

    return formattedPhoneNumber;
  };

  const handleChange = (event) => {
    const inputValue = event.target.value
    
    const formattedNumber = formatPhoneNumber(inputValue);
    setPhone(formattedNumber);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    const formattedNumber = formatPhoneNumber(paste);
    setPhone(formattedNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (phone === '') {
      setError('Phone number is required.');
    } else if (phone.length < 14) {
      setError('Invalid phone number.');
    } else {
      setError('');
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Enter Phone Number</h2>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            onPaste={handlePaste}
            maxLength="14"
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
