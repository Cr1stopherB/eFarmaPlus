// services/userService.js
// Servicio para gestión de usuarios conectado al backend real
import { get, post, put, del } from './api';

/**
 * Mapear usuario del backend al formato del frontend
 */
const mapUserFromBackend = (usuario) => {
    return {
        id: usuario.id,
        nombre: usuario.contacto || 'Usuario',
        email: usuario.correo,
        rut: usuario.rut,
        telefono: usuario.telefono,
        rol: usuario.rol?.nombre || 'usuario',
        rolId: usuario.rol?.id,
        direccion: usuario.direccion ? {
            calle: usuario.direccion.calle,
            numero: usuario.direccion.numero,
            comuna: usuario.direccion.comuna?.nombre
        } : null,
        activo: true // Por defecto activo
    };
};

/**
 * Mapear usuario del frontend al formato del backend
 */
const mapUserToBackend = (user) => {
    return {
        rut: user.rut || '',
        contacto: user.nombre,
        correo: user.email,
        contrasenaHash: user.password || '',
        telefono: user.telefono || '',
        rol: user.rolId ? { id: user.rolId } : null
    };
};

/**
 * Obtener todos los usuarios
 */
export const getAllUsers = async () => {
    try {
        const usuarios = await get('/usuarios');
        return usuarios.map(mapUserFromBackend);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

/**
 * Obtener usuario por ID
 */
export const getUserById = async (id) => {
    try {
        const usuario = await get(`/usuarios/${id}`);
        return mapUserFromBackend(usuario);
    } catch (error) {
        console.error(`Error al obtener usuario ${id}:`, error);
        throw error;
    }
};

/**
 * Crear nuevo usuario
 */
export const createUser = async (userData) => {
    try {
        const backendUser = mapUserToBackend(userData);
        const newUser = await post('/usuarios', backendUser);
        return mapUserFromBackend(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

/**
 * Actualizar usuario existente
 */
export const updateUser = async (id, userData) => {
    try {
        const backendUser = mapUserToBackend(userData);
        const updatedUser = await put(`/usuarios/${id}`, backendUser);
        return mapUserFromBackend(updatedUser);
    } catch (error) {
        console.error(`Error al actualizar usuario ${id}:`, error);
        throw error;
    }
};

/**
 * Eliminar usuario
 */
export const deleteUser = async (id) => {
    try {
        await del(`/usuarios/${id}`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar usuario ${id}:`, error);
        throw error;
    }
};

/**
 * Obtener todos los roles disponibles
 */
export const getRoles = async () => {
    try {
        const roles = await get('/roles');
        return roles.map(rol => ({
            id: rol.id,
            nombre: rol.nombre
        }));
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return [
            { id: 1, nombre: 'usuario' },
            { id: 2, nombre: 'admin' }
        ];
    }
};

/**
 * Login de usuario (simulado - tu backend no tiene endpoint de auth)
 */
export const loginUser = async (email, password) => {
    try {
        // Como no hay endpoint de login, buscamos el usuario por email
        const usuarios = await getAllUsers();
        const usuario = usuarios.find(u => u.email === email);

        if (usuario) {
            return {
                success: true,
                user: usuario
            };
        }

        return {
            success: false,
            message: 'Usuario no encontrado'
        };
    } catch (error) {
        console.error('Error al hacer login:', error);
        return {
            success: false,
            message: 'Error al conectar con el servidor'
        };
    }
};

/**
 * Registro de usuario
 */
export const registerUser = async (userData) => {
    try {
        const newUser = await createUser(userData);
        return {
            success: true,
            user: newUser
        };
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return {
            success: false,
            message: 'Error al registrar usuario'
        };
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getRoles,
    loginUser,
    registerUser
};
