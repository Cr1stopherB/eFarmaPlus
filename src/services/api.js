import axios from 'axios';

// URL backend
const API_URL = import.meta.env.VITE_API_URL || 'https://efarmaplusback.onrender.com/api';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

// Crear instancia de axios 
const api = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // err
            console.error('Error de respuesta:', error.response.status, error.response.data);

            switch (error.response.status) {
                case 404:
                    console.error('Recurso no encontrado');
                    break;
                case 500:
                    console.error('Error interno del servidor');
                    break;
                default:
                    console.error('Error en la petición');
            }
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta
            console.error('No hay respuesta del servidor');
        } else {
            // Algo pasó al configurar la petición
            console.error('Error al configurar la petición:', error.message);
        }

        return Promise.reject(error);
    }
);

export const get = async (url, config = {}) => {
    try {
        const response = await api.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// POST - Crear datos
export const post = async (url, data, config = {}) => {
    try {
        const response = await api.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PUT - Actualizar datos (completo)
export const put = async (url, data, config = {}) => {
    try {
        const response = await api.put(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PATCH - Actualizar datos (parcial)
export const patch = async (url, data, config = {}) => {
    try {
        const response = await api.patch(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// DELETE - Eliminar datos
export const del = async (url, config = {}) => {
    try {
        const response = await api.delete(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
