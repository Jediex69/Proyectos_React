import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { id, title, price, category, image, description } = product;
  const { addToCart } = useCart();

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={image} 
          className="card-img-top" 
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }} 
        />

        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 align-self-start">
            {category}
          </span>

          <h5 className="card-title fw-bold text-truncate" title={title}>
            {title}
          </h5>

          <p className="card-text text-muted small flex-grow-1">
            {description}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <span className="fs-5 fw-bold text-primary">${price}</span>
            
            <div className="d-flex gap-2">
              {/* Enlace a la página de detalle sin recargar */}
              <Link 
                to={`/producto/${id}`} 
                className="btn btn-outline-secondary btn-sm"
              >
                Ver
              </Link>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => addToCart(product)}
              >
                <i className="bi bi-cart-plus me-1"></i>
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;