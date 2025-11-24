import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

    // Usuario autorizado
    return children;
};

export default PrivateRoute;
