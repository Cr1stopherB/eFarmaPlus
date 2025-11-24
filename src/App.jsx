// App.jsx
// Componente principal con configuración de rutas dinámicas
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import PrivateRoute from './components/molecules/PrivateRoute';
import { publicRoutes, adminRoutes } from './routes/config';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <Routes>
              {/* Rutas públicas */}
              {publicRoutes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}

              {/* Rutas de admin protegidas */}
              {adminRoutes.map(({ path, element: Element }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute requiredRole="admin">
                      <Element />
                    </PrivateRoute>
                  }
                />
              ))}
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;