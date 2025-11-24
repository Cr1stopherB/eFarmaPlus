import React, { useState, useEffect } from 'react';
import Table from '../../components/molecules/Table';
import Modal from '../../components/molecules/Modal';
import DynamicForm from '../../components/molecules/DynamicForm';
import Button from '../../components/atoms/Button';
import userService from '../../services/userService';
import '../../styles/pages/Admin.css';

const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setDataLoading(true);
        try {
            const [usersData, rolesData] = await Promise.all([
                userService.getAllUsers(),
                userService.getRoles()
            ]);

            setUsers(usersData);
            setRoles(rolesData);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            alert('Error al cargar datos del servidor');
        } finally {
            setDataLoading(false);
        }
    };

    const formFields = [
        {
            name: 'nombre',
            label: 'Nombre Completo',
            type: 'text',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true
        },
        {
            name: 'rut',
            label: 'RUT',
            type: 'text',
            placeholder: '12345678-9'
        },
        {
            name: 'telefono',
            label: 'Teléfono',
            type: 'text',
            placeholder: '+56 9 1234 5678'
        },
        {
            name: 'rolId',
            label: 'Rol',
            type: 'select',
            required: true,
            options: roles.map(rol => ({
                value: rol.id,
                label: rol.nombre
            }))
        }
    ];

    const handleCreate = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const user = users.find(u => u.id === row[0]);
        if (user) {
            setEditingUser(user);
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (row) => {
        const userId = row[0];
        const userName = row[1];

        if (window.confirm(`¿Estás seguro de eliminar al usuario "${userName}"?`)) {
            try {
                await userService.deleteUser(userId);
                setUsers(users.filter(u => u.id !== userId));
                alert('Usuario eliminado exitosamente');
            } catch (error) {
                alert('Error al eliminar usuario: ' + error.message);
            }
        }
    };

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const userData = {
                nombre: formData.nombre,
                email: formData.email,
                rut: formData.rut || '',
                telefono: formData.telefono || '',
                rolId: Number(formData.rolId)
            };

            if (editingUser) {
                const updatedUser = await userService.updateUser(editingUser.id, userData);
                setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
                alert('Usuario actualizado exitosamente');
            } else {
                const newUser = await userService.createUser(userData);
                setUsers([...users, newUser]);
                alert('Usuario creado exitosamente');
            }

            setIsModalOpen(false);
            setEditingUser(null);
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const tableData = users.map(u => [
        u.id,
        u.nombre,
        u.email,
        u.rol === 'admin' ? '👑 Admin' : '👤 Usuario',
        u.rut || 'N/A'
    ]);

    if (dataLoading) {
        return (
            <div className="admin-page">
                <div className="admin-header">
                    <h1>Gestión de Usuarios</h1>
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    Cargando usuarios...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Gestión de Usuarios</h1>
                <Button onClick={handleCreate}>
                    ➕ Nuevo Usuario
                </Button>
            </div>

            <Table
                columns={['ID', 'Nombre', 'Email', 'Rol', 'RUT']}
                data={tableData}
                actions={{
                    edit: handleEdit,
                    delete: handleDelete
                }}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => !isLoading && setIsModalOpen(false)}
                title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            >
                <DynamicForm
                    fields={formFields}
                    initialValues={editingUser || {}}
                    onSubmit={handleSubmit}
                    onCancel={() => !isLoading && setIsModalOpen(false)}
                    submitText={isLoading ? 'Guardando...' : 'Guardar Usuario'}
                />
            </Modal>
        </div>
    );
};

export default UsersAdmin;
