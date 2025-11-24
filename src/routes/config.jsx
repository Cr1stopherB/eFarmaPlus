import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';

import Dashboard from '../pages/admin/Dashboard';
import ProductsAdmin from '../pages/admin/ProductsAdmin';
import UsersAdmin from '../pages/admin/UsersAdmin';
import OrdersAdmin from '../pages/admin/OrdersAdmin';

export const publicRoutes = [
    {
        path: '/',
        element: Home,
        title: 'Inicio'
    },
    {
        path: '/productos',
        element: Products,
        title: 'Productos'
    },
    {
        path: '/producto/:id',
        element: ProductDetail,
        title: 'Detalle del Producto'
    },
    {
        path: '/carrito',
        element: Cart,
        title: 'Carrito de Compras'
    },
    {
        path: '/login',
        element: Login,
        title: 'Iniciar Sesión'
    },
    {
        path: '/registro',
        element: Register,
        title: 'Registrarse'
    }
];

export const adminRoutes = [
    {
        path: '/admin',
        element: Dashboard,
        title: 'Panel de Administración'
    },
    {
        path: '/admin/productos',
        element: ProductsAdmin,
        title: 'Gestión de Productos'
    },
    {
        path: '/admin/usuarios',
        element: UsersAdmin,
        title: 'Gestión de Usuarios'
    },
    {
        path: '/admin/pedidos',
        element: OrdersAdmin,
        title: 'Gestión de Pedidos'
    }
];