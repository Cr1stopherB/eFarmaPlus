// pages/admin/Dashboard.jsx
// Panel principal de administración con estadísticas reales
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaUsers, FaClipboardList, FaDollarSign, FaHome } from 'react-icons/fa';
import productService from '../../services/productService';
import userService from '../../services/userService';
import orderService from '../../services/orderService';
import '../../styles/pages/Admin.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            const [products, users, orders] = await Promise.all([
                productService.getAllProducts(),
                userService.getAllUsers(),
                orderService.getAllOrders()
            ]);

            const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

            setStats({
                totalProducts: products.length,
                totalUsers: users.length,
                totalOrders: orders.length,
                revenue: revenue
            });
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            title: 'Productos',
            value: stats.totalProducts,
            icon: <FaBox />,
            color: '#10b981',
            link: '/admin/productos'
        },
        {
            title: 'Usuarios',
            value: stats.totalUsers,
            icon: <FaUsers />,
            color: '#3b82f6',
            link: '/admin/usuarios'
        },
        {
            title: 'Pedidos',
            value: stats.totalOrders,
            icon: <FaClipboardList />,
            color: '#f59e0b',
            link: '/admin/pedidos'
        },
        {
            title: 'Ingresos',
            value: `$${stats.revenue.toLocaleString()}`,
            icon: <FaDollarSign />,
            color: '#8b5cf6',
            link: null
        }
    ];

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-header">
                    <h1>Panel de Administración</h1>
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    Cargando estadísticas...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Panel de Administración</h1>
                <p> | Bienvenido al panel de control de eFarma</p>
            </div>

            <div className="stats-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        style={{ borderLeft: `4px solid ${card.color}` }}
                        onClick={() => card.link && navigate(card.link)}
                    >
                        <div className="stat-icon" style={{ color: card.color }}>
                            {card.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{card.title}</h3>
                            <p className="stat-value">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-actions">
                <h2>Acciones Rápidas</h2>
                <div className="action-buttons">
                    <button
                        className="action-btn"
                        onClick={() => navigate('/admin/productos')}
                    >
                        <span><FaBox /></span>
                        <span>Gestionar Productos</span>
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => navigate('/admin/usuarios')}
                    >
                        <span><FaUsers /></span>
                        <span>Gestionar Usuarios</span>
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => navigate('/admin/pedidos')}
                    >
                        <span><FaClipboardList /></span>
                        <span>Ver Pedidos</span>
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => navigate('/')}
                    >
                        <span><FaHome /></span>
                        <span>Volver a la Tienda</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
