import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import '../styles/pages/ProductDetail.css';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Cargar producto
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProductById(id);
                if (data) {
                    setProduct(data);
                } else {
                    navigate('/productos'); // Redirigir si no existe
                }
            } catch (error) {
                console.error('Error al cargar producto:', error);
                navigate('/productos');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id, navigate]);

    // Manejar agregar al carrito
    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
            navigate('/carrito');
        }
    };

    // Aumentar cantidad
    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    // Disminuir cantidad
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (!product) {
        return null;
    }

    // Calcular precio con descuento
    const finalPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Volver
                </button>

                <div className="product-detail-content">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                        {product.discount > 0 && (
                            <span className="discount-badge">-{product.discount}%</span>
                        )}
                    </div>

                    <div className="product-detail-info">
                        <span className="product-category">{product.category}</span>
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-price">
                            {product.discount > 0 && (
                                <span className="price-original">${product.price}</span>
                            )}
                            <span className="price-final">${Math.round(finalPrice)}</span>
                        </div>

                        <p className="product-description">{product.description}</p>

                        <div className="product-stock">
                            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                                {product.stock > 0
                                    ? `En stock (${product.stock} unidades)`
                                    : 'Agotado'}
                            </span>
                        </div>

                        <div className="quantity-selector">
                            <label>Cantidad:</label>
                            <div className="quantity-controls">
                                <button onClick={decreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                        </div>
                        <div className="product-actions">
                            <Button
                                variant="primary"
                                fullWidth
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                Agregar al Carrito
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
