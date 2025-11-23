// components/atoms/Logo.jsx
// Componente simple del logo de la farmacia
import React from 'react';
import '../../styles/atoms/Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <span className="logo-icon">💊</span>
      <span className="logo-text">eFarmaPlus</span>
    </div>
  );
};

export default Logo;
