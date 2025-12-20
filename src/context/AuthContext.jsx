import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';

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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const login = (userData) => {
        const userWithRole = {
            ...userData,
            rol: userData.rol || 'usuario'
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
    const register = async (userData) => {
        try {
            // Preparar datos para el servicio
            const dataToService = {
                ...userData,
                rolId: 1 // Rol por defecto: Usuario (ID 1)
            };

            // Usar el servicio de usuarios que ya tiene el mapeo correcto
            const userWithRole = await userService.createUser(dataToService);

            setUser(userWithRole);
            localStorage.setItem('user', JSON.stringify(userWithRole));
            return userWithRole;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
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
