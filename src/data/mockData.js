// data/mockData.js
// Datos de ejemplo de productos farmacéuticos
// Esta estructura será compatible con la futura API del backend

export const productos = [
    // Medicamentos
    {
        id: 1,
        name: "Paracetamol 500mg x 20 tabletas",
        category: "Medicamentos",
        price: 3500,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
        description: "Analgésico y antipirético para el alivio del dolor y la fiebre.",
        stock: 50,
        discount: 0
    },
    {
        id: 2,
        name: "Ibuprofeno 400mg x 30 cápsulas",
        category: "Medicamentos",
        price: 5200,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
        description: "Antiinflamatorio no esteroideo para dolor e inflamación.",
        stock: 35,
        discount: 10
    },
    {
        id: 3,
        name: "Amoxicilina 500mg x 21 cápsulas",
        category: "Medicamentos",
        price: 8900,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
        description: "Antibiótico de amplio espectro. Requiere receta médica.",
        stock: 20,
        discount: 0
    },

    // Vitaminas
    {
        id: 4,
        name: "Vitamina C 1000mg x 60 tabletas",
        category: "Vitaminas",
        price: 12500,
        image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop",
        description: "Suplemento de vitamina C para fortalecer el sistema inmune.",
        stock: 45,
        discount: 15
    },
    {
        id: 5,
        name: "Complejo B x 100 cápsulas",
        category: "Vitaminas",
        price: 15800,
        image: "https://images.unsplash.com/photo-1550572017-edd951aa8f29?w=400&h=400&fit=crop",
        description: "Vitaminas del complejo B para energía y vitalidad.",
        stock: 30,
        discount: 0
    },
    {
        id: 6,
        name: "Omega 3 x 90 cápsulas",
        category: "Vitaminas",
        price: 18900,
        image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop",
        description: "Ácidos grasos omega 3 para la salud cardiovascular.",
        stock: 25,
        discount: 20
    },

    // Cuidado Personal
    {
        id: 7,
        name: "Alcohol Gel Antibacterial 500ml",
        category: "Cuidado Personal",
        price: 4500,
        image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=400&fit=crop",
        description: "Gel antibacterial para higiene de manos.",
        stock: 100,
        discount: 0
    },
    {
        id: 8,
        name: "Mascarillas Quirúrgicas x 50 unidades",
        category: "Cuidado Personal",
        price: 12000,
        image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop",
        description: "Mascarillas desechables de 3 capas.",
        stock: 200,
        discount: 10
    },
    {
        id: 9,
        name: "Termómetro Digital",
        category: "Cuidado Personal",
        price: 8500,
        image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400&h=400&fit=crop",
        description: "Termómetro digital de lectura rápida.",
        stock: 15,
        discount: 0
    },

    // Dermatología
    {
        id: 10,
        name: "Protector Solar FPS 50+ 120ml",
        category: "Dermatología",
        price: 16500,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
        description: "Protección solar de amplio espectro.",
        stock: 40,
        discount: 15
    },
    {
        id: 11,
        name: "Crema Hidratante Facial 50ml",
        category: "Dermatología",
        price: 13200,
        image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=400&fit=crop",
        description: "Crema hidratante para todo tipo de piel.",
        stock: 30,
        discount: 0
    },
    {
        id: 12,
        name: "Sérum Vitamina C 30ml",
        category: "Dermatología",
        price: 19500,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        description: "Sérum antioxidante con vitamina C para luminosidad.",
        stock: 20,
        discount: 25
    }
];

// Categorías disponibles
export const categorias = [
    "Todas",
    "Medicamentos",
    "Vitaminas",
    "Cuidado Personal",
    "Dermatología"
];

// Función para obtener todos los productos
export const obtenerTodosLosProductos = () => {
    return productos;
};

// Función para obtener un producto por ID
export const obtenerProductoPorId = (id) => {
    return productos.find(producto => producto.id === parseInt(id));
};

// Función para obtener productos por categoría
export const obtenerProductosPorCategoria = (categoria) => {
    if (categoria === "Todas") {
        return productos;
    }
    return productos.filter(producto => producto.category === categoria);
};

// Función para buscar productos
export const buscarProductos = (termino) => {
    const terminoLower = termino.toLowerCase();
    return productos.filter(producto =>
        producto.name.toLowerCase().includes(terminoLower) ||
        producto.category.toLowerCase().includes(terminoLower) ||
        producto.description.toLowerCase().includes(terminoLower)
    );
};
