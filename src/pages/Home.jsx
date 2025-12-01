import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { FaPrescriptionBottleAlt } from 'react-icons/fa';
import ProductCard from '../components/atoms/ProductCard';
import Button from '../components/atoms/Button';
import { useCart } from '../context/CartContext';
import '../styles/pages/Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Cargar productos al montar el componente
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Manejar agregar al carrito
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    // Productos destacados (primeros 6)
    const featuredProducts = products.slice(0, 6);

    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }

    return (
        <div className="home">
            {/* Banner principal */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Bienvenido a eFarmaPlus</h1>
                    <p>Tu farmacia online de confianza. Productos de calidad para tu salud y bienestar.</p>
                </div>
            </section>

            {/* Categorías principales */}
            <section className="categories">
                <h2>Categorías</h2>
                <div className="category-grid">
                    <div className="category-card" onClick={() => navigate('/productos?categoria=Medicamentos')}>
                        <span className="category-icon"><FaPrescriptionBottleAlt /></span>
                        <h3>Medicamentos</h3>
                    </div>
                    <div className="category-card" onClick={() => navigate('/productos?categoria=Cuidado Personal')}>
                        <span className="category-icon"><FaPrescriptionBottleAlt /></span>
                        <h3>Cuidado Personal</h3>
                    </div>
                    <div className="category-card" onClick={() => navigate('/productos?categoria=Dermatología')}>
                        <span className="category-icon"><FaPrescriptionBottleAlt /></span>
                        <h3>Dermatología</h3>
                    </div>
                </div>
            </section>

            <section className="featured">
                <h2>Productos Destacados</h2>
                <div className="product-grid">
                    {featuredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
                <div className="featured-footer">
                    <Button variant="outline" onClick={() => navigate('/productos')}>
                        Ver Todos los Productos
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
