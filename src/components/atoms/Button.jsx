// components/atoms/Button.jsx
// Componente de botón reutilizable para toda la aplicación
import React from 'react';
import '../../styles/atoms/Button.css';

const Button = ({
    children,
    onClick,
    variant = 'primary', // primary, secondary, outline
    type = 'button',
    disabled = false,
    fullWidth = false
}) => {
    return (
        <button
            className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
