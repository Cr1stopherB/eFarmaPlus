// components/atoms/NavButton.jsx
import React from 'react';
import '../../styles/atoms/NavButton.css';

const NavButton = ({ children, onClick, isActive = false }) => {
  return (
    <button 
      className={`nav-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NavButton;