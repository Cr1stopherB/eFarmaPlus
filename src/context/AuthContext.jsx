// context/AuthContext.jsx
// Contexto para manejar autenticación de usuarios
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear contexto
const AuthContext = createContext();

// Hook para usar el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
    // Estado del usuario autenticado
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar usuario desde localStorage al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // Función para iniciar sesión
    const login = (userData) => {
        // Agregar rol por defecto si no existe
        const userWithRole = {
            ...userData,
            rol: userData.rol || 'usuario' // Por defecto es usuario
        };
        setUser(userWithRole);
        localStorage.setItem('user', JSON.stringify(userWithRole));
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Función para registrar usuario
    const register = (userData) => {
        // Agregar rol por defecto
        const userWithRole = {
            ...userData,
            rol: userData.rol || 'usuario'
        };
        setUser(userWithRole);
        localStorage.setItem('user', JSON.stringify(userWithRole));
    };

    // Verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return user !== null;
    };

    // Verificar si el usuario es admin
    const isAdmin = () => {
        return user?.rol === 'admin';
    };

    // Valor del contexto
    const value = {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
