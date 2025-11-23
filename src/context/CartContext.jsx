// context/CartContext.jsx
// Contexto para manejar el estado del carrito de compras de forma simple
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};

// Provider del carrito
export const CartProvider = ({ children }) => {
    // Estado del carrito - array de productos con cantidad
    const [cartItems, setCartItems] = useState([]);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('efarmaplus-cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('efarmaplus-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Agregar producto al carrito
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Verificar si el producto ya está en el carrito
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Si ya existe, aumentar la cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, agregarlo con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Eliminar producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Actualizar cantidad de un producto
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Vaciar todo el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Calcular el total de items en el carrito
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calcular el precio total
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            // Si tiene descuento, usar precio con descuento
            const price = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    // Valores y funciones que se compartirán
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
