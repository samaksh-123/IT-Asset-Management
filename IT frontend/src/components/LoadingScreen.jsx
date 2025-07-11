import React from 'react';
import './LoadingScreen.css';
import logo from '../assets/oc logo.jpg'; // adjust path if needed

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Logo" className="loading-logo" />
      <div className="loader"></div>
      <p>Loading dashboard...</p>
    </div>
  );
};

export default LoadingScreen;
