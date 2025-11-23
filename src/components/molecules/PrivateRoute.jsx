// components/molecules/PrivateRoute.jsx
// Componente para proteger rutas que requieren autenticación
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para rutas privadas
 * Redirige a login si el usuario no está autenticado
 * Redirige a home si el usuario no tiene el rol requerido
 * 
 * @param {ReactNode} children - Componente a renderizar si está autorizado
 * @param {String} requiredRole - Rol requerido ('admin', 'usuario', null)
 */
const PrivateRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user } = useAuth();

    // Si no está autenticado, redirigir a login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Si requiere rol específico y el usuario no lo tiene
    if (requiredRole && user?.rol !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    // Usuario autorizado, mostrar contenido
    return children;
};

export default PrivateRoute;
