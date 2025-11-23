// pages/admin/OrdersAdmin.jsx
// Gestión de pedidos conectado a API real
import React, { useState, useEffect } from 'react';
import Table from '../../components/molecules/Table';
import Modal from '../../components/molecules/Modal';
import Button from '../../components/atoms/Button';
import orderService from '../../services/orderService';
import '../../styles/pages/Admin.css';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [estados, setEstados] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setDataLoading(true);
        try {
            const [ordersData, estadosData] = await Promise.all([
                orderService.getAllOrders(),
                orderService.getEstados()
            ]);

            setOrders(ordersData);
            setEstados(estadosData);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            alert('Error al cargar datos del servidor');
        } finally {
            setDataLoading(false);
        }
    };

    const handleViewOrder = (row) => {
        const order = orders.find(o => o.id === row[0]);
        if (order) {
            setSelectedOrder(order);
            setIsModalOpen(true);
        }
    };

    const handleChangeStatus = async (orderId, estadoNombre) => {
        setIsLoading(true);
        try {
            const estado = estados.find(e => e.nombre === estadoNombre);

            if (estado) {
                await orderService.updateOrderStatus(orderId, estado.id);

                // Actualizar el estado en la lista
                const updatedOrders = orders.map(o =>
                    o.id === orderId ? { ...o, estado: estadoNombre, estadoId: estado.id } : o
                );
                setOrders(updatedOrders);

                alert(`Estado del pedido #${orderId} actualizado a: ${estadoNombre}`);
                setIsModalOpen(false);
            }
        } catch (error) {
            alert('Error al cambiar estado: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (estado) => {
        const badges = {
            'Pendiente': '⏳ Pendiente',
            'Procesando': '📦 Procesando',
            'En camino': '🚚 En camino',
            'Entregado': '✅ Entregado',
            'Cancelado': '❌ Cancelado'
        };
        return badges[estado] || `📋 ${estado}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL');
    };

    const tableData = orders.map(o => [
        o.id,
        o.usuario?.nombre || 'Cliente',
        formatDate(o.fecha),
        `$${o.total?.toLocaleString() || 0}`,
        o.productos || 0,
        getStatusBadge(o.estado)
    ]);

    if (dataLoading) {
        return (
            <div className="admin-page">
                <div className="admin-header">
                    <h1>Gestión de Pedidos</h1>
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    Cargando pedidos...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Gestión de Pedidos</h1>
                <div className="stats-summary">
                    <span>Total: {orders.length} pedidos</span>
                    <span>Ingresos: ${orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()}</span>
                </div>
            </div>

            <Table
                columns={['Pedido', 'Cliente', 'Fecha', 'Total', 'Productos', 'Estado']}
                data={tableData}
                onRowClick={handleViewOrder}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => !isLoading && setIsModalOpen(false)}
                title={`Pedido #${selectedOrder?.id}`}
            >
                {selectedOrder && (
                    <div className="order-details">
                        <div className="detail-row">
                            <strong>Cliente:</strong>
                            <span>{selectedOrder.usuario?.nombre || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Email:</strong>
                            <span>{selectedOrder.usuario?.email || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Fecha:</strong>
                            <span>{formatDate(selectedOrder.fecha)}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Total:</strong>
                            <span>${selectedOrder.total?.toLocaleString() || 0}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Método de Pago:</strong>
                            <span>{selectedOrder.metodoPago}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Método de Envío:</strong>
                            <span>{selectedOrder.metodoEnvio}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Dirección:</strong>
                            <span>{selectedOrder.direccionEnvio || 'No especificada'}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Estado actual:</strong>
                            <span className="current-status">{getStatusBadge(selectedOrder.estado)}</span>
                        </div>

                        <div className="status-actions">
                            <h3>Cambiar Estado:</h3>
                            <div className="status-buttons">
                                {estados.map(estado => (
                                    <button
                                        key={estado.id}
                                        onClick={() => handleChangeStatus(selectedOrder.id, estado.nombre)}
                                        disabled={isLoading}
                                    >
                                        {getStatusBadge(estado.nombre)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OrdersAdmin;
