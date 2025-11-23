// components/organisms/Footer.jsx
// Footer profesional con información de la empresa
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/organisms/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Sección principal del footer */}
            <div className="footer-main">
                <div className="footer-container">
                    {/* Columna 1: Acerca de */}
                    <div className="footer-column">
                        <div className="footer-logo">
                            <span className="logo-icon">💊</span>
                            <span className="logo-text">eFarma</span>
                        </div>
                        <p className="footer-description">
                            Tu farmacia online de confianza. Productos de calidad,
                            entrega rápida y los mejores precios del mercado.
                        </p>
                        {/* Redes Sociales */}
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">📘</a>
                            <a href="#" className="social-link" aria-label="Instagram">📷</a>
                            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                            <a href="#" className="social-link" aria-label="WhatsApp">💬</a>
                        </div>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div className="footer-column">
                        <h3 className="footer-title">Navegación</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/productos">Productos</Link></li>
                            <li><Link to="/carrito">Carrito</Link></li>
                            <li><Link to="/login">Mi Cuenta</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Categorías */}
                    <div className="footer-column">
                        <h3 className="footer-title">Categorías</h3>
                        <ul className="footer-links">
                            <li><Link to="/productos?categoria=Medicamentos">Medicamentos</Link></li>
                            <li><Link to="/productos?categoria=Vitaminas">Vitaminas</Link></li>
                            <li><Link to="/productos?categoria=Cuidado Personal">Cuidado Personal</Link></li>
                            <li><Link to="/productos?categoria=Dermatología">Dermatología</Link></li>
                        </ul>
                    </div>

                    {/* Columna 4: Contacto */}
                    <div className="footer-column">
                        <h3 className="footer-title">Contacto</h3>
                        <ul className="footer-contact">
                            <li>
                                <span className="contact-icon">📧</span>
                                <span>info@efarma.com</span>
                            </li>
                            <li>
                                <span className="contact-icon">📞</span>
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li>
                                <span className="contact-icon">📍</span>
                                <span>Santiago, Chile</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sección de copyright */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} eFarma. Todos los derechos reservados.
                    </p>
                    <div className="footer-payment">
                        <span className="payment-text">Métodos de pago:</span>
                        <div className="payment-icons">
                            <span>💳</span>
                            <span>🏦</span>
                            <span>💰</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
