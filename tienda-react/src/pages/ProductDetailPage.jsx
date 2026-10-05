import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  // 1. Extraemos el 'id' de la URL (ej: si la URL es /producto/3, id valdrá "3")
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setIsLoading(true);
        // Pedimos solo ese producto a la API
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();

        setProduct({
          id: data.id,
          title: data.title,
          price: data.price,
          category: data.category,
          description: data.description,
          image: data.thumbnail,
          rating: data.rating,
          brand: data.brand || "Generico",
          stock: data.stock,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]); // Si el ID de la URL cambia, volvemos a pedir los datos

  if (isLoading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="alert alert-danger text-center my-5">
        <h4>Error al cargar el producto</h4>
        <p>{error}</p>
        <Link to="/" className="btn btn-outline-danger mt-2">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Botón para volver atrás */}
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-1"></i> Volver al Catálogo
      </Link>

      <div className="row g-5 align-items-center">
        {/* Foto del producto */}
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="img-fluid w-100"
              style={{ maxHeight: '420px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-12 col-md-6">
          <span className="badge bg-secondary mb-2 text-uppercase">
            {product.category}
          </span>
          <h1 className="fw-bold display-6 mb-2">{product.title}</h1>
          
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="badge bg-warning text-dark fs-6">
              <i className="bi bi-star-fill me-1"></i> {product.rating}
            </span>
            <span className="text-muted small">Marca: <strong>{product.brand}</strong></span>
            <span className="text-muted small">Stock: <strong>{product.stock} disponibles</strong></span>
          </div>

          <h2 className="text-primary fw-bold display-5 mb-4">
            ${product.price}
          </h2>

          <p className="lead text-muted mb-4">
            {product.description}
          </p>

          <button 
            className="btn btn-primary btn-lg px-4 py-2 d-flex align-items-center gap-2"
            onClick={() => addToCart(product)}
          >
            <i className="bi bi-cart-plus fs-5"></i>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;