import axios from 'axios';

const API_URL = 'https://efarmaback2.onrender.com/api';

class OrderService {

    // Mappers
    _mapOrderFromBackend(venta) {
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
            productos: 0
        };
    }

    _mapOrderToBackend(order) {
        return {
            usuario: order.usuarioId ? { id: order.usuarioId } : null,
            estado: order.estadoId ? { id: order.estadoId } : null,
            metodoPago: order.metodoPagoId ? { id: order.metodoPagoId } : null,
            metodoEnvio: order.metodoEnvioId ? { id: order.metodoEnvioId } : null,
            total: Number(order.total) || 0,
            direccionEnvio: order.direccionEnvio || ''
        };
    }

    // Methods
    async getAllOrders() {
        try {
            const response = await axios.get(`${API_URL}/ventas`);
            const ventas = response.data;
            return ventas.map(v => this._mapOrderFromBackend(v));
        } catch (error) {
            console.error('Error al obtener ventas:', error);
            return [];
        }
    }

    async getOrderById(id) {
        try {
            const response = await axios.get(`${API_URL}/ventas/${id}`);
            return this._mapOrderFromBackend(response.data);
        } catch (error) {
            console.error(`Error al obtener venta ${id}:`, error);
            throw error;
        }
    }

    async createOrder(orderData) {
        try {
            const backendOrder = this._mapOrderToBackend(orderData);
            const response = await axios.post(`${API_URL}/ventas`, backendOrder);
            return this._mapOrderFromBackend(response.data);
        } catch (error) {
            console.error('Error al crear venta:', error);
            throw error;
        }
    }

    async updateOrder(id, orderData) {
        try {
            const backendOrder = this._mapOrderToBackend(orderData);
            const response = await axios.put(`${API_URL}/ventas/${id}`, backendOrder);
            return this._mapOrderFromBackend(response.data);
        } catch (error) {
            console.error(`Error al actualizar venta ${id}:`, error);
            throw error;
        }
    }

    async updateOrderStatus(id, estadoId) {
        try {
            // Primero obtenemos la venta actual para no perder datos
            const ventaResponse = await axios.get(`${API_URL}/ventas/${id}`);
            const venta = ventaResponse.data;

            const updatedVenta = {
                ...venta,
                estado: { id: estadoId }
            };

            const response = await axios.patch(`${API_URL}/ventas/${id}`, updatedVenta);
            return this._mapOrderFromBackend(response.data);
        } catch (error) {
            console.error(`Error al actualizar estado de venta ${id}:`, error);
            throw error;
        }
    }

    async deleteOrder(id) {
        try {
            await axios.delete(`${API_URL}/ventas/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar venta ${id}:`, error);
            throw error;
        }
    }

    async getEstados() {
        try {
            const response = await axios.get(`${API_URL}/estados`);
            return response.data.map(estado => ({
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
    }

    async getMetodosPago() {
        try {
            const response = await axios.get(`${API_URL}/metodos-pago`);
            return response.data.map(metodo => ({
                id: metodo.id,
                nombre: metodo.nombre
            }));
        } catch (error) {
            console.error('Error al obtener métodos de pago:', error);
            return [];
        }
    }

    async getMetodosEnvio() {
        try {
            const response = await axios.get(`${API_URL}/metodos-envio`);
            return response.data.map(metodo => ({
                id: metodo.id,
                nombre: metodo.nombre
            }));
        } catch (error) {
            console.error('Error al obtener métodos de envío:', error);
            return [];
        }
    }
}

export default new OrderService();