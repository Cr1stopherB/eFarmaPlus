import React from 'react';
import NavButton from '../atoms/NavButton';
import '../../styles/molecules/Navigation.css';

const Navigation = () => {
  const menuItems = ['Inicio', 'Medicamentos', 'Cuidado Personal', 'Ofertas', 'Contacto'];

  return (
    <nav className="navigation">
      {menuItems.map((item, index) => (
        <NavButton key={index}>
          {item}
        </NavButton>
      ))}
    </nav>
  );
};

export default Navigation;