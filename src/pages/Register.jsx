// pages/Register.jsx
// Página de registro de nuevos usuarios
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/atoms/Button';
import '../styles/pages/Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        // Validar nombre
        if (!formData.nombre) {
            newErrors.nombre = 'El nombre es requerido';
        } else if (formData.nombre.length < 3) {
            newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

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

        // Validar confirmación de contraseña
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Crear objeto de usuario
            const userData = {
                nombre: formData.nombre,
                email: formData.email
            };

            // Guardar en contexto
            register(userData);

            // Redirigir al home con transición
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Logo/Header */}
                <div className="auth-header">
                    <h1>💊 eFarma</h1>
                    <p>Crea tu cuenta</p>
                </div>

                {/* Formulario */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={errors.nombre ? 'error' : ''}
                            placeholder="Juan Pérez"
                        />
                        {errors.nombre && (
                            <span className="error-message">{errors.nombre}</span>
                        )}
                    </div>

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

                    {/* Confirmar Contraseña */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Botón de submit */}
                    <Button type="submit" fullWidth>
                        Crear Cuenta
                    </Button>
                </form>

                {/* Link para login */}
                <div className="auth-footer">
                    <p>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="link-primary">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
