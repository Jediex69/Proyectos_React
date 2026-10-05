import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        {/* Aquí React Router decide qué página renderizar según la URL */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>

      <footer className="bg-white border-top py-4 text-center text-muted mt-5">
        <div className="container">
          <small>© 2026 ElectroStore - Construido con React, Bootstrap y React Router</small>
        </div>
      </footer>

      <CartModal />
    </div>
  );
}

export default App;