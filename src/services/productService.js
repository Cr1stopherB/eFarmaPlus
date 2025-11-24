import { get, post, put, del } from './api';

const mapProductFromBackend = (producto) => {
    return {
        id: producto.id,
        name: producto.nombre,
        description: producto.descripcion || '',
        price: producto.precio,
        stock: producto.stock,
        category: producto.categoria?.nombreCategoria || 'Sin categoría',
        image: producto.imagenes?.[0]?.url || 'https://via.placeholder.com/300',
        brand: producto.laboratorio?.nombre || '',
        requiresPrescription: producto.requiereReceta || false,
        categoryId: producto.categoria?.id,
        laboratoryId: producto.laboratorio?.id,
        fabricationType: producto.tipoFabricacion?.nombre || ''
    };
};

const mapProductToBackend = (product) => {
    const categoryId = Number(product.categoryId);
    const laboratoryId = Number(product.laboratoryId);
    const fabricationTypeId = Number(product.fabricationTypeId);

    return {
        nombre: product.name,
        descripcion: product.description || '',
        precio: Number(product.price),
        stock: Number(product.stock),
        requiereReceta: product.requiresPrescription || false,
        categoria: (categoryId && !isNaN(categoryId)) ? { id: categoryId } : null,
        laboratorio: (laboratoryId && !isNaN(laboratoryId)) ? { id: laboratoryId } : null,
        imagenes: []
    };
};

export const addImageToProduct = async (productId, imageUrl) => {
    try {
        const imageData = {
            url: imageUrl,
            producto: { id: productId }
        };
        await post('/imagenes', imageData);
        return true;
    } catch (error) {
        console.error('Error al asociar imagen al producto:', error);
        return false;
    }
};

export const getAllProducts = async () => {
    try {
        const productos = await get('/productos');

        if (!Array.isArray(productos)) {
            console.error('La respuesta no es un array:', productos);
            return [];
        }

        return productos.map(mapProductFromBackend);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const producto = await get(`/productos/${id}`);
        return mapProductFromBackend(producto);
    } catch (error) {
        console.error(`Error al obtener producto ${id}:`, error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryName) => {
    try {
        const allProducts = await getAllProducts();

        if (categoryName === 'Todas') {
            return allProducts;
        }

        return allProducts.filter(product =>
            product.category.toLowerCase() === categoryName.toLowerCase()
        );
    } catch (error) {
        console.error('Error al filtrar productos por categoría:', error);
        return [];
    }
};

export const searchProducts = async (searchTerm) => {
    try {
        const allProducts = await getAllProducts();

        if (!searchTerm || searchTerm.trim() === '') {
            return allProducts;
        }

        const term = searchTerm.toLowerCase();
        return allProducts.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return [];
    }
};

export const createProduct = async (productData, imageUrl = null) => {
    try {
        const backendProduct = mapProductToBackend(productData);
        const newProduct = await post('/productos', backendProduct);

        if (imageUrl) {
            await addImageToProduct(newProduct.id, imageUrl);
            newProduct.imagenes = [{ url: imageUrl }];
        }

        return mapProductFromBackend(newProduct);
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData, imageUrl = null) => {
    try {
        const backendProduct = mapProductToBackend(productData);

        console.log('=== UPDATE PRODUCT ===');
        console.log('ID:', id);
        console.log('Objeto a enviar al backend:', JSON.stringify(backendProduct, null, 2));
        console.log('URL de imagen:', imageUrl);

        const updatedProduct = await put(`/productos/${id}`, backendProduct);

        if (imageUrl) {
            await addImageToProduct(id, imageUrl);
            updatedProduct.imagenes = [{ url: imageUrl }];
        }

        return mapProductFromBackend(updatedProduct);
    } catch (error) {
        console.error(`Error al actualizar producto ${id}:`, error);
        throw error;
    }
};

/**
 * Eliminar producto
 */
export const deleteProduct = async (id) => {
    try {
        await del(`/productos/${id}`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar producto ${id}:`, error);
        throw error;
    }
};

/**
 * Obtener todas las categorías disponibles
 */
export const getCategories = async () => {
    try {
        const categorias = await get('/categorias');
        return categorias.map(cat => ({
            id: cat.id,
            name: cat.nombreCategoria
        }));
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
};

/**
 * Obtener todos los laboratorios/marcas
 */
export const getLaboratories = async () => {
    try {
        const laboratorios = await get('/marcas');
        return laboratorios.map(lab => ({
            id: lab.id,
            name: lab.nombre
        }));
    } catch (error) {
        console.error('Error al obtener laboratorios:', error);
        return [];
    }
};

/**
 * Función para obtener los productos destacados/con descuento
 * (Por ahora retorna los primeros 6)
 */
export const getFeaturedProducts = async () => {
    try {
        const allProducts = await getAllProducts();
        return allProducts.slice(0, 6); // Primeros 6 productos
    } catch (error) {
        console.error('Error al obtener productos destacados:', error);
        return [];
    }
};

// Exportaciones por defecto para retrocompatibilidad
export default {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getLaboratories,
    getFeaturedProducts,
    addImageToProduct
};
