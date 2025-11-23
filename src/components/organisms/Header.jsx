// components/organisms/Header.jsx
import React from 'react';
//import Logo from '../atoms/Logo';
import Navigation from '../molecules/Navegation';
import UserActions from '../molecules/UserActions';
import '../../styles/organisms/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <Navigation />
        <UserActions />
      </div>
    </header>
  );
};

export default Header;