import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/atoms/ProductCard';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import '../styles/pages/Products.css';

const Products = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState(['Todas']); // Empieza con "Todas"
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    const categoryParam = searchParams.get('categoria');
    const searchTerm = searchParams.get('buscar') || '';

    // Cargar categorías desde la API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await productService.getCategories();
                const categoryNames = ['Todas', ...categoriesData.map(cat => cat.name)];
                setCategories(categoryNames);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    // Cargar productos desde la API
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
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

    useEffect(() => {
        let filtered = products;

        // Filtrar por categoría
        if (selectedCategory !== 'Todas') {
            filtered = filtered.filter(p =>
                p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Filtrar por término de búsqueda
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredProducts(filtered);
    }, [products, selectedCategory, searchTerm]);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="products-page">
            <div className="products-container">
                <aside className="filters-sidebar">
                    <h3>Categorías</h3>
                    <div className="category-filters">
                        {categories.map(categoria => (
                            <button
                                key={categoria}
                                className={`filter-button ${selectedCategory === categoria ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </aside>

                <main className="products-main">
                    <div className="products-header">
                        <h1>
                            {searchTerm
                                ? `Resultados para "${searchTerm}"`
                                : selectedCategory === 'Todas' ? 'Todos los Productos' : selectedCategory
                            }
                        </h1>
                        <p className="products-count">
                            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {loading ? (
                        <div className="loading">Cargando productos desde el servidor...</div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    )}

                    {filteredProducts.length === 0 && !loading && (
                        <div className="no-products">
                            <p>No se encontraron productos{searchTerm && ` para "${searchTerm}"`}.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
