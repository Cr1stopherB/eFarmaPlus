# Estructura del Proyecto eFarmaPlus

## 📋 Descripción General

eFarmaPlus es un e-commerce de productos farmacéuticos desarrollado con **React + Vite**. El proyecto sigue la metodología **Atomic Design** para organizar los componentes de manera escalable y mantenible.

## 📁 Estructura de Carpetas

```
eFarmaPlus/
├── public/                  # Archivos públicos estáticos
├── src/
│   ├── components/          # Componentes de la aplicación
│   │   ├── atoms/          # Componentes más pequeños (botones, logos, etc.)
│   │   ├── molecules/      # Combinación de atoms (navegación, etc.)
│   │   ├── organisms/      # Componentes complejos (header, etc.)
│   │   └── templates/      # Plantillas de página (vacío por ahora)
│   ├── context/            # Contextos de React (estado global)
│   ├── data/               # Datos mock y funciones auxiliares
│   ├── pages/              # Páginas principales de la aplicación
│   ├── services/           # Servicios para comunicación con backend
│   ├── styles/             # Archivos CSS organizados por componente
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── pages/
│   │   └── global.css      # Variables y estilos globales
│   ├── App.jsx             # Componente principal con rutas
│   ├── App.css             # Estilos del componente principal
│   ├── main.jsx            # Punto de entrada de la aplicación
│   └── index.css           # Estilos base
├── package.json            # Dependencias y scripts
└── vite.config.js          # Configuración de Vite
```

## 🧩 Atomic Design - Explicación Simple

El proyecto usa **Atomic Design**, que es como construir con bloques LEGO:

### 1️⃣ **Atoms (Átomos)** - Piezas más pequeñas
Son los componentes más básicos que no se pueden dividir más:
- `Logo.jsx` - El logo de la farmacia
- `Button.jsx` - Botones reutilizables
- `NavButton.jsx` - Botones de navegación
- `ProductCard.jsx` - Tarjeta de producto

### 2️⃣ **Molecules (Moléculas)** - Combinación de átomos
Componentes que combinan varios átomos:
- `Navigation.jsx` - Barra de navegación (usa NavButton)
- `UserActions.jsx` - Acciones del usuario (búsqueda, carrito)

### 3️⃣ **Organisms (Organismos)** - Secciones completas
Componentes complejos que forman secciones completas:
- `Header.jsx` - Encabezado completo (usa Logo, Navigation, UserActions)

### 4️⃣ **Pages (Páginas)** - Páginas completas
Páginas completas de la aplicación:
- `Home.jsx` - Página de inicio
- `Products.jsx` - Catálogo de productos
- `ProductDetail.jsx` - Detalle de un producto
- `Cart.jsx` - Carrito de compras

## 📂 Descripción de Carpetas Importantes

### `/context` - Estado Global
Aquí se maneja el estado que necesita compartirse entre varios componentes.

- **CartContext.jsx**: Maneja todo el carrito de compras
  - Agregar productos
  - Eliminar productos
  - Actualizar cantidades
  - Calcular totales
  - Guardar en localStorage

### `/data` - Datos Mock
Datos de ejemplo que luego se reemplazarán con datos del backend.

- **mockData.js**: Productos de ejemplo, categorías y funciones de búsqueda

### `/services` - Conexión con Backend
Archivos preparados para conectar con el backend (actualmente usan datos mock).

- **api.js**: Configuración base para llamadas HTTP (GET, POST, PUT, DELETE)
- **productService.js**: Servicio específico para productos
  - `getAllProducts()` - Obtiene todos los productos
  - `getProductById(id)` - Obtiene un producto específico
  - `getProductsByCategory(category)` - Filtra por categoría
  - `searchProducts(term)` - Busca productos

**💡 Para conectar con el backend:** Solo necesitas descomentar las líneas marcadas como "VERSIÓN BACKEND" y comentar las de "VERSIÓN MOCK".

### `/styles` - Estilos CSS

#### `global.css` - Variables y Estilos Globales
Define todas las variables CSS usadas en el proyecto:
- Colores (verde farmacia, grises, etc.)
- Espaciados
- Bordes
- Sombras

Ejemplo de uso:
```css
background-color: var(--primary-green);
padding: var(--spacing-md);
border-radius: var(--radius-lg);
```

## 🎨 Sistema de Colores

El proyecto usa colores apropiados para una farmacia:

- **Verde principal**: `#059669` - Color de confianza y salud
- **Verde oscuro**: `#047857` - Para hover y énfasis
- **Azul secundario**: `#0284c7` - Para acciones secundarias
- **Grises**: Para texto y fondos neutros
- **Rojo**: Para descuentos y alertas

## 🔄 Flujo de Datos

### Cómo funciona el carrito:
1. Usuario hace clic en "Agregar al Carrito"
2. Se llama `addToCart(producto)` del CartContext
3. El producto se agrega al estado del carrito
4. Se guarda automáticamente en localStorage
5. El contador del carrito en el Header se actualiza
6. El usuario puede ver sus productos en `/carrito`

### Cómo se cargan los productos:
1. Página se monta (useEffect)
2. Se llama a `productService.getAllProducts()`
3. Actualmente retorna datos de mockData.js
4. Los datos se guardan en el estado del componente
5. Los productos se muestran en pantalla

## 🚀 Próximos Pasos para Conectar con Backend

### 1. Configurar la URL del Backend
En `src/services/api.js`, cambia la URL:
```javascript
const API_BASE_URL = 'http://tu-servidor.com/api';
```

### 2. Descomentar las Llamadas API
En `src/services/productService.js`, para cada función:
```javascript
// Comentar esto:
// return obtenerTodosLosProductos();

// Descomentar esto:
return await api.get('/productos');
```

### 3. Asegurar que el Backend Retorne el Mismo Formato
Los productos deben tener esta estructura:
```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,
  image: string (URL),
  description: string,
  stock: number,
  discount: number (0-100)
}
```

## 🛠️ Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 📦 Dependencias Principales

- **react** - Biblioteca principal
- **react-dom** - Renderizado en el DOM
- **react-router-dom** - Navegación entre páginas
- **vite** - Herramienta de build rápida

## 💡 Consejos para Entender el Código

1. **Empieza por App.jsx**: Es el punto de entrada, verás cómo se conecta todo
2. **Mira CartContext.jsx**: Es simple y muestra cómo funciona el estado global
3. **Revisa las páginas**: Cada página es independiente y fácil de entender
4. **Los comentarios te guían**: Todo el código tiene comentarios en español explicando qué hace

## 🔍 ¿Dónde buscar qué?

- **¿Quieres cambiar colores?** → `src/styles/global.css`
- **¿Agregar una nueva página?** → Crear en `src/pages/` y agregar ruta en `App.jsx`
- **¿Modificar el header?** → `src/components/organisms/Header.jsx`
- **¿Cambiar datos de productos?** → `src/data/mockData.js`
- **¿Conectar con backend?** → `src/services/`

---

**Creado con ❤️ para ser simple y entendible**
