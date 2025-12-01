import axios from 'axios';

const API_URL = 'https://efarmaplusback.onrender.com/api';

class UserService {

    // Mappers
    _mapUserFromBackend(usuario) {
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
    }

    _mapUserToBackend(user) {
        return {
            rut: user.rut || '',
            contacto: user.nombre,
            correo: user.email,
            contrasenaHash: user.password || '',
            telefono: user.telefono || '',
            rol: user.rolId ? { id: user.rolId } : null
        };
    }

    // Methods
    async getAllUsers() {
        try {
            const response = await axios.get(`${API_URL}/usuarios`);
            const usuarios = response.data;
            return usuarios.map(u => this._mapUserFromBackend(u));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            return [];
        }
    }

    async getUserById(id) {
        try {
            const response = await axios.get(`${API_URL}/usuarios/${id}`);
            return this._mapUserFromBackend(response.data);
        } catch (error) {
            console.error(`Error al obtener usuario ${id}:`, error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            const backendUser = this._mapUserToBackend(userData);
            const response = await axios.post(`${API_URL}/usuarios`, backendUser);
            return this._mapUserFromBackend(response.data);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            const backendUser = this._mapUserToBackend(userData);
            const response = await axios.put(`${API_URL}/usuarios/${id}`, backendUser);
            return this._mapUserFromBackend(response.data);
        } catch (error) {
            console.error(`Error al actualizar usuario ${id}:`, error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            await axios.delete(`${API_URL}/usuarios/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar usuario ${id}:`, error);
            throw error;
        }
    }

    async getRoles() {
        try {
            const response = await axios.get(`${API_URL}/roles`);
            return response.data.map(rol => ({
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
    }

    async loginUser(email, password) {
        try {
            // Como no hay endpoint de login, buscamos el usuario por email
            const usuarios = await this.getAllUsers();
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
    }

    async registerUser(userData) {
        try {
            const newUser = await this.createUser(userData);
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
    }
}

export default new UserService();
