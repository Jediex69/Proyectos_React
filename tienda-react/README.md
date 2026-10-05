# 🛒 ElectroStore - E-Commerce SPA con React

Una Single Page Application (SPA) moderna de comercio electrónico desarrollada con **React 19**, **Vite**, **Bootstrap 5** y **React Router**. Construida desde cero aplicando las mejores prácticas y patrones de arquitectura en React.

---

## 🚀 Características Principales

- ⚡ **Catálogo Dinámico desde API REST**: Conexión asíncrona con [DummyJSON](https://dummyjson.com/) mediante `fetch` y `async/await`, con gestión de estados de carga (*Loading Spinner*) y control de errores.
- 🔍 **Búsqueda y Filtros en Tiempo Real**: Filtrado reactivo por texto y por categorías dinámicas sin recargar la página (*Derived State*).
- 🛍️ **Carrito de Compras Interactivo (Offcanvas)**:
  - Agrupación inteligente de productos para evitar duplicados.
  - Control de cantidades (`+` y `-`) con recálculo dinámico de subtotales.
  - Eliminación individual de productos.
  - Cálculo del importe total con `.reduce()`.
- 💾 **Persistencia de Datos**: Almacenamiento y sincronización automática del carrito con `localStorage` usando `useEffect`.
- 🌐 **Navegación SPA con React Router**:
  - Catálogo principal (`/`).
  - Vista de detalle de producto (`/producto/:id`) con rutas dinámicas y el hook `useParams()`.
  - Enlaces fluidos sin parpadeos de recarga (`<Link>`).
- 🏛️ **Arquitectura Global con Context API**: Eliminación completa de *Prop Drilling* mediante un proveedor global (`CartProvider`) y el Custom Hook `useCart()`.
- 📱 **Diseño Responsivo**: Maquetado limpio con Bootstrap 5 y Bootstrap Icons.

---

## 🛠️ Tecnologías y Librerías

| Tecnología | Propósito |
|---|---|
| **React 19** | Biblioteca principal de interfaz de usuario |
| **Vite** | Empaquetador y entorno de desarrollo ultra rápido |
| **React Router v7** | Enrutamiento del lado del cliente (SPA) |
| **Bootstrap 5.3** | Sistema de diseño, rejilla responsiva y componentes |
| **Bootstrap Icons** | Iconografía para carrito, búsqueda, valoraciones y más |
| **Context API** | Gestión de estado global |

---

## 📂 Estructura del Proyecto

```text
src/
├── components/          # Componentes reutilizables
│   ├── CartModal.jsx    # Panel lateral desplegable del carrito
│   ├── Navbar.jsx       # Barra de navegación con contador dinámico
│   ├── ProductCard.jsx  # Tarjeta individual de producto
│   └── SearchBar.jsx    # Buscador y filtros de categoría
├── context/
│   └── CartContext.jsx  # Estado global del carrito (Context API + useCart)
├── data/
│   └── products.js      # Datos mock iniciales
├── pages/
│   ├── HomePage.jsx          # Vista principal con catálogo y filtros
│   └── ProductDetailPage.jsx # Vista detallada individual (/producto/:id)
├── App.jsx              # Definición de rutas y layout general
├── index.css            # Estilos base
└── main.jsx             # Punto de entrada (BrowserRouter + CartProvider)
```

---

## 💻 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Jediex69/Proyectos_React.git
   cd Proyectos_React/tienda-react
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre tu navegador en [http://localhost:5173](http://localhost:5173).

---

## 🧠 Conceptos de React aplicados en este proyecto

- **Hooks Nativos:** `useState`, `useEffect`, `useContext`.
- **Custom Hooks:** `useCart()` para encapsular la lógica del carrito.
- **Inmutabilidad:** Actualización de arrays y objetos con Spread Operator (`...`), `.map()` y `.filter()`.
- **Renderizado Condicional:** Operadores ternarios y evaluación de cortocircuito (`&&`).
- **Formularios Controlados:** Inputs vinculados al estado (`value` y `onChange`).
