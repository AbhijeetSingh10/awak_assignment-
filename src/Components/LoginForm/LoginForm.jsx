import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setUsernameError(usernameError);
      setPasswordError(passwordError);
      return;
    }

    // Normalize username to lowercase
    const normalizedUsername = username.toLowerCase();

    // Clear previous response and errors
    setResponse('');
    setUsernameError('');
    setPasswordError('');
    setLoading(true); // Set loading to true

    // Perform API request
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: normalizedUsername,
        password
      })
    })
    .then(response => response.json())
    .then((data) => {
      if (data) {
        // Simulate success based on the presence of data
        setResponse('Login successful!');
      } else {
        setResponse('Login failed. Please try again.');
      }
      setLoading(false); // Set loading to false when done
    })
    .catch((error) => {
      setResponse('Error: ' + error.message);
      setLoading(false); // Set loading to false on error
    });

    // Reset username and password fields
    setUsername('');
    setPassword('');
  };

  // Function to validate username
  const validateUsername = (username) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!username || !emailRegex.test(username)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  // Function to validate password
  const validatePassword = (password) => {
    if (!password || password.length < 6) {
      return 'Please enter a password with at least 6 characters.';
    }
    return '';
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <FaUser className='icon' />
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {usernameError && <span className="error">{usernameError}</span>}
        </div>
        <div className="input-box">
          <FaLock className='icon' />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type='submit' disabled={loading}>Login</button> {/* Disable button when loading */}

        <div className="register-link">
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>

        {loading && <div className="spinner"></div>} {/* Show spinner when loading */}

        {response && <p className="response-message">{response}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
