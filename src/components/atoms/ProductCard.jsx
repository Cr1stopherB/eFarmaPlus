// components/atoms/ProductCard.jsx
// Tarjeta de producto con estilo e-commerce moderno
import React from 'react';
import Button from './Button';
import '../../styles/atoms/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    // Calcular precio con descuento
    const finalPrice = product.discount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;

    return (
        <div className="product-card">
            {/* Badge de descuento */}
            {product.discount > 0 && (
                <div className="discount-badge">-{product.discount}%</div>
            )}

            {/* Imagen del producto */}
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            {/* Información del producto */}
            <div className="product-info">
                {/* Categoría/Marca */}
                <p className="product-category">{product.category.toUpperCase()}</p>

                {/* Nombre del producto */}
                <h3 className="product-name">{product.name}</h3>

                {/* Precios */}
                <div className="product-pricing">
                    {product.discount > 0 && (
                        <span className="price-original">${product.price.toLocaleString()}</span>
                    )}
                    <div className="price-main">
                        <span className="price-currency">$</span>
                        <span className="price-value">{finalPrice.toLocaleString()}</span>
                    </div>
                </div>

                {/* Botón de agregar */}
                <Button
                    variant="primary"
                    onClick={() => onAddToCart(product)}
                    fullWidth
                >
                    Agregar al Carrito
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
