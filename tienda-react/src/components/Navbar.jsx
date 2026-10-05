import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const storeName = "ElectroStore";
  const { totalItems, openCart } = useCart();

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Usamos Link en vez de <a> */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <i className="bi bi-laptop text-warning fs-4"></i>
          <span className="fw-bold">{storeName}</span>
        </Link>

        <button 
          className="btn btn-outline-light position-relative"
          onClick={openCart}
        >
          <i className="bi bi-cart3 me-1"></i>
          Carrito
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;