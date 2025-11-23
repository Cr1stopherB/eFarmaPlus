# eFarmaPlus - E-commerce Farmacéutico 💊

E-commerce moderno de productos farmacéuticos desarrollado con React + Vite. Diseño simple, limpio y profesional.

![Status](https://img.shields.io/badge/status-activo-brightgreen)
![React](https://img.shields.io/badge/react-19.1.1-blue)
![Vite](https://img.shields.io/badge/vite-7.1.7-purple)

## ✨ Características

- 🏠 Página de inicio con productos destacados
- 📦 Catálogo completo de productos con filtros por categoría
- 🔍 Vista detallada de cada producto
- 🛒 Carrito de compras funcional con persistencia local
- 📱 Diseño responsive (mobile, tablet, desktop)
- 🎨 Interfaz limpia y profesional con colores de farmacia
- 🚀 Preparado para conectar con backend

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio (si aplica)
git clone https://github.com/tu-usuario/eFarmaPlus.git

# Entrar al directorio
cd eFarmaPlus

# Instalar dependencias
npm install
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173/`

### Construir para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 📂 Estructura del Proyecto

```
src/
├── components/      # Componentes organizados con Atomic Design
│   ├── atoms/       # Componentes básicos (botones, logo, etc.)
│   ├── molecules/   # Combinación de atoms
│   ├── organisms/   # Componentes complejos (header)
│   └── templates/   # Plantillas (vacío por ahora)
├── context/         # Estado global (CartContext)
├── data/            # Datos mock de productos
├── pages/           # Páginas de la aplicación
├── services/        # Servicios para backend
└── styles/          # Estilos CSS organizados
```

📖 **Para más detalles sobre la estructura, ver [ESTRUCTURA.md](./ESTRUCTURA.md)**

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] Header con navegación
- [x] Página de inicio (Home)
- [x] Catálogo de productos (Products)
- [x] Detalle de producto (ProductDetail)
- [x] Carrito de compras (Cart)
- [x] Gestión de estado del carrito (Context API)
- [x] Datos mock de productos farmacéuticos
- [x] Sistema de rutas con React Router
- [x] Diseño responsive
- [x] Servicios preparados para backend

### 🔜 Pendientes (Futuras Iteraciones)
- [ ] Página de login/registro
- [ ] Sistema de búsqueda
- [ ] Conexión con backend real
- [ ] Sistema de pagos
- [ ] Historial de pedidos

## 🔗 Conexión con Backend

El proyecto está preparado para conectarse con un backend. Actualmente usa datos mock.

### Para conectar con tu backend:

1. **Configura la URL en** `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://tu-backend.com/api';
   ```

2. **En** `src/services/productService.js`, comenta las líneas de "VERSIÓN MOCK" y descomenta las de "VERSIÓN BACKEND"

3. **Asegúrate de que tu backend retorne productos con esta estructura**:
   ```javascript
   {
     id: number,
     name: string,
     category: string,
     price: number,
     image: string,
     description: string,
     stock: number,
     discount: number
   }
   ```

📖 **Ver [ESTRUCTURA.md](./ESTRUCTURA.md) para más detalles sobre la integración**

## 🎨 Stack Tecnológico

- **React 19** - Biblioteca de UI
- **Vite 7** - Herramienta de build moderna y rápida
- **React Router v7** - Navegación entre páginas
- **Context API** - Gestión de estado
- **CSS Vanilla** - Estilos sin frameworks CSS
- **Bootstrap 5** (instalado, no usado actualmente)

## 📱 Capturas de Pantalla

*(Puedes agregar capturas aquí cuando ejecutes la aplicación)*

## 🤝 Contribución

Este es un proyecto educativo/personal. Si quieres contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

- **Código comentado en español**: Todo el código tiene comentarios explicativos
- **Diseño simple**: Fácil de entender y modificar
- **Preparado para escalar**: Estructura organizada con Atomic Design
- **Variables CSS**: Todos los colores y espaciados centralizados

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como proyecto de e-commerce farmacéutico

---

**¿Tienes preguntas?** Revisa [ESTRUCTURA.md](./ESTRUCTURA.md) para una guía completa del proyecto.

**Made with ❤️ using React + Vite**
