// pages/Login.jsx
// Página de inicio de sesión con autenticación
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/atoms/Button';
import '../styles/pages/Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo al escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        // Validar email - SOLO @gmail.com
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!formData.email.endsWith('@gmail.com')) {
            newErrors.email = 'Solo se aceptan correos @gmail.com';
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
            newErrors.email = 'Email inválido. Use el formato correo@gmail.com';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Extraer nombre del email (parte antes del @)
            const nombre = formData.email.split('@')[0];

            // Detectar si es admin basado en el email
            const rol = formData.email === 'admin@gmail.com' ? 'admin' : 'usuario';

            // Crear objeto de usuario
            const userData = {
                nombre: nombre,
                email: formData.email,
                rol: rol
            };

            // Guardar en contexto
            login(userData);

            // Navegar al home o admin con transición
            setTimeout(() => {
                navigate(rol === 'admin' ? '/admin' : '/');
            }, 1000);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Logo/Header */}
                <div className="auth-header">
                    <h1>💊 eFarma</h1>
                    <p>Inicia sesión en tu cuenta</p>
                </div>

                {/* Formulario */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="tucorreo@gmail.com"
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {/* Link de olvidé contraseña */}
                    <div className="form-links">
                        <Link to="/recuperar-password" className="link-secondary">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Botón de submit */}
                    <Button type="submit" fullWidth>
                        Iniciar Sesión
                    </Button>
                </form>

                {/* Link para registro */}
                <div className="auth-footer">
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" className="link-primary">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
