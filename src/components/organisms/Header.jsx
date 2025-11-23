// components/organisms/Header.jsx
// Header estilo moderno simplificado y centrado con categorías dinámicas
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getCategories } from '../../services/productService';
import '../../styles/organisms/Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  // Cargar categorías desde la API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        // Limitar a las primeras 4 categorías para el header
        setCategories(categoriesData.slice(0, 4));
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    loadCategories();
  }, []);

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productos?buscar=${searchTerm}`);
      setSearchTerm(''); // Limpiar campo después de buscar
    }
  };

  // Manejar click en usuario
  const handleUserClick = (e) => {
    if (isAuthenticated()) {
      e.preventDefault();
      // Aquí podrías mostrar un menú dropdown o redirigir a perfil
      const shouldLogout = window.confirm('¿Deseas cerrar sesión?');
      if (shouldLogout) {
        logout();
      }
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-icon">💊</span>
          <span className="logo-text">eFarma</span>
        </Link>

        {/* Barra de búsqueda */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar Productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        {/* Usuario - Mostrar nombre si está autenticado */}
        <Link
          to={isAuthenticated() ? "#" : "/login"}
          className="header-user"
          onClick={handleUserClick}
        >
          <span className="user-greeting">
            {isAuthenticated() ? `¡Hola, ${user.nombre}!` : '¡Hola!'}
          </span>
          <span className="user-action">
            {isAuthenticated() ? 'Mi cuenta' : 'Inicia sesión'}
          </span>
        </Link>

        {/* Carrito */}
        <button className="header-cart" onClick={() => navigate('/carrito')}>
          <span className="cart-icon">🛒</span>
          {getTotalItems() > 0 && (
            <span className="cart-count">{getTotalItems()}</span>
          )}
        </button>
      </div>

      {/* Navegación secundaria - Categorías dinámicas */}
      <div className="header-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/productos" className="nav-link">Todos los Productos</Link>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/productos?categoria=${category.name}`}
              className="nav-link"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;