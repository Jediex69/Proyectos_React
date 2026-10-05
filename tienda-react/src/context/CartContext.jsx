import { createContext, useContext, useState, useEffect } from 'react';

// 1. Creamos el Contexto
const CartContext = createContext();

// 2. Creamos el Proveedor que envolverá nuestra aplicación
export function CartProvider({ children }) {
  // Estado de los productos en el carrito con persistencia
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('electro_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Estado para abrir/cerrar el modal
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sincronizar con localStorage
  useEffect(() => {
    localStorage.setItem('electro_cart', JSON.stringify(cart));
  }, [cart]);

  // Funciones del carrito
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Cálculos derivados
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Todo lo que compartimos globalmente
  const value = {
    cart,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addToCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Custom Hook para consumir el contexto fácilmente
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}