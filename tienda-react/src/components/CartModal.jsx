import { useCart } from '../context/CartContext';

function CartModal() {
  const { 
    isCartOpen, 
    closeCart, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    totalPrice 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div>
      <div 
        className="modal-backdrop fade show" 
        onClick={closeCart}
        style={{ zIndex: 1040 }}
      ></div>

      <div 
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg p-4 d-flex flex-column" 
        style={{ width: '420px', maxWidth: '100%', zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <h4 className="fw-bold mb-0">
            <i className="bi bi-cart3 me-2"></i> Tu Carrito
          </h4>
          <button 
            type="button" 
            className="btn-close" 
            onClick={closeCart}
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="flex-grow-1 overflow-auto pe-1">
          {cart.length === 0 ? (
            <div className="text-center text-muted my-5">
              <i className="bi bi-cart-x display-3 d-block mb-3"></i>
              <p className="fs-5">Tu carrito está vacío.</p>
              <small>¡Añade algún producto para comenzar!</small>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {cart.map((item) => (
                <li 
                  key={item.id} 
                  className="list-group-item d-flex align-items-center px-0 py-3"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '55px', height: '55px', objectFit: 'cover' }} 
                    className="rounded me-3"
                  />
                  
                  <div className="flex-grow-1 me-2">
                    <h6 className="mb-1 text-truncate" style={{ maxWidth: '180px' }} title={item.title}>
                      {item.title}
                    </h6>
                    <small className="text-muted d-block mb-2">
                      ${item.price} c/u • <strong className="text-primary">${(item.price * item.quantity).toFixed(2)}</strong>
                    </small>

                    <div className="btn-group btn-group-sm" role="group">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        title="Restar una unidad"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="btn btn-outline-secondary disabled text-dark fw-bold px-3">
                        {item.quantity}
                      </span>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        title="Sumar una unidad"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <button 
                    className="btn btn-outline-danger btn-sm border-0 ms-2"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar producto"
                  >
                    <i className="bi bi-trash fs-5"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-top pt-3 mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fs-5 fw-bold">Total:</span>
              <span className="fs-4 fw-bold text-primary">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <button 
              className="btn btn-primary w-100 py-2 fw-bold d-flex justify-content-center align-items-center gap-2"
              onClick={() => alert("¡Compra finalizada con éxito! 🎉")}
            >
              <i className="bi bi-credit-card"></i>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;