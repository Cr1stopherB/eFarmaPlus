// services/orderService.js
// Servicio para gestión de ventas/pedidos conectado al backend real
import { get, post, put, patch, del } from './api';

/**
 * Mapear venta del backend al formato del frontend
 */
const mapOrderFromBackend = (venta) => {
    return {
        id: venta.id,
        usuario: {
            id: venta.usuario?.id,
            nombre: venta.usuario?.contacto || 'Cliente',
            email: venta.usuario?.correo
        },
        fecha: venta.fechaCreacion || new Date().toISOString(),
        total: venta.total || 0,
        estado: venta.estado?.nombre || 'Pendiente',
        estadoId: venta.estado?.id,
        metodoPago: venta.metodoPago?.nombre || 'No especificado',
        metodoEnvio: venta.metodoEnvio?.nombre || 'No especificado',
        direccionEnvio: venta.direccionEnvio || '',
        productos: 0 // Tu backend no tiene detalle de productos en venta
    };
};

/**
 * Mapear pedido del frontend al formato del backend
 */
const mapOrderToBackend = (order) => {
    return {
        usuario: order.usuarioId ? { id: order.usuarioId } : null,
        estado: order.estadoId ? { id: order.estadoId } : null,
        metodoPago: order.metodoPagoId ? { id: order.metodoPagoId } : null,
        metodoEnvio: order.metodoEnvioId ? { id: order.metodoEnvioId } : null,
        total: Number(order.total) || 0,
        direccionEnvio: order.direccionEnvio || ''
    };
};

/**
 * Obtener todas las ventas/pedidos
 */
export const getAllOrders = async () => {
    try {
        const ventas = await get('/ventas');
        return ventas.map(mapOrderFromBackend);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        return [];
    }
};

/**
 * Obtener venta por ID
 */
export const getOrderById = async (id) => {
    try {
        const venta = await get(`/ventas/${id}`);
        return mapOrderFromBackend(venta);
    } catch (error) {
        console.error(`Error al obtener venta ${id}:`, error);
        throw error;
    }
};

/**
 * Crear nueva venta
 */
export const createOrder = async (orderData) => {
    try {
        const backendOrder = mapOrderToBackend(orderData);
        const newOrder = await post('/ventas', backendOrder);
        return mapOrderFromBackend(newOrder);
    } catch (error) {
        console.error('Error al crear venta:', error);
        throw error;
    }
};

/**
 * Actualizar venta existente
 */
export const updateOrder = async (id, orderData) => {
    try {
        const backendOrder = mapOrderToBackend(orderData);
        const updatedOrder = await put(`/ventas/${id}`, backendOrder);
        return mapOrderFromBackend(updatedOrder);
    } catch (error) {
        console.error(`Error al actualizar venta ${id}:`, error);
        throw error;
    }
};

/**
 * Actualizar solo el estado de una venta
 */
export const updateOrderStatus = async (id, estadoId) => {
    try {
        const venta = await getOrderById(id);
        const updatedOrder = await patch(`/ventas/${id}`, {
            ...venta,
            estado: { id: estadoId }
        });
        return mapOrderFromBackend(updatedOrder);
    } catch (error) {
        console.error(`Error al actualizar estado de venta ${id}:`, error);
        throw error;
    }
};

/**
 * Eliminar venta
 */
export const deleteOrder = async (id) => {
    try {
        await del(`/ventas/${id}`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar venta ${id}:`, error);
        throw error;
    }
};

/**
 * Obtener todos los estados disponibles
 */
export const getEstados = async () => {
    try {
        const estados = await get('/estados');
        return estados.map(estado => ({
            id: estado.id,
            nombre: estado.nombre
        }));
    } catch (error) {
        console.error('Error al obtener estados:', error);
        return [
            { id: 1, nombre: 'Pendiente' },
            { id: 2, nombre: 'Procesando' },
            { id: 3, nombre: 'En camino' },
            { id: 4, nombre: 'Entregado' }
        ];
    }
};

/**
 * Obtener todos los métodos de pago
 */
export const getMetodosPago = async () => {
    try {
        const metodos = await get('/metodos-pago');
        return metodos.map(metodo => ({
            id: metodo.id,
            nombre: metodo.nombre
        }));
    } catch (error) {
        console.error('Error al obtener métodos de pago:', error);
        return [];
    }
};

/**
 * Obtener todos los métodos de envío
 */
export const getMetodosEnvio = async () => {
    try {
        const metodos = await get('/metodos-envio');
        return metodos.map(metodo => ({
            id: metodo.id,
            nombre: metodo.nombre
        }));
    } catch (error) {
        console.error('Error al obtener métodos de envío:', error);
        return [];
    }
};

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getEstados,
    getMetodosPago,
    getMetodosEnvio
};
