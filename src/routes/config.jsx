// routes/config.jsx
// Configuración centralizada de rutas de la aplicación
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Rutas de administración
import Dashboard from '../pages/admin/Dashboard';
import ProductsAdmin from '../pages/admin/ProductsAdmin';
import UsersAdmin from '../pages/admin/UsersAdmin';
import OrdersAdmin from '../pages/admin/OrdersAdmin';

/**
 * Configuración de rutas públicas de la aplicación
 * 
 * Cada ruta tiene:
 * - path: ruta de la URL
 * - element: componente a renderizar
 * - title: título de la página (opcional)
 * - requireAuth: si requiere autenticación (opcional)
 */
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

/**
 * Configuración de rutas del panel de administración
 * Estas rutas requieren autenticación y rol de admin
 */
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

/**
 * Función helper para generar rutas dinámicamenteUso en App.jsx:
 * 
 * import { publicRoutes, adminRoutes } from './routes/config';
 * import PrivateRoute from './components/molecules/PrivateRoute';
 * 
 * <Routes>
 *   {publicRoutes.map(({ path, element: Element }) => (
 *     <Route key={path} path={path} element={<Element />} />
 *   ))}
 *   
 *   {adminRoutes.map(({ path, element: Element }) => (
 *     <Route 
 *       key={path} 
 *       path={path} 
 *       element={
 *         <PrivateRoute requiredRole="admin">
 *           <Element />
 *         </PrivateRoute>
 *       } 
 *     />
 *   ))}
 * </Routes>
 */
