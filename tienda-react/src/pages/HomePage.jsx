import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=9");
        if (!res.ok) throw new Error("No se pudieron cargar los productos");
        const data = await res.json();
        
        const adaptedProducts = data.products.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          description: item.description,
          image: item.thumbnail,
        }));

        setProducts(adaptedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["Todas", ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2 className="fw-bold mb-4">Catálogo de Productos</h2>

      {isLoading ? (
        <div className="text-center py-5 my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando catálogo desde la API...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center my-4">
          <i className="bi bi-exclamation-triangle-fill fs-3 d-block mb-2"></i>
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {filteredProducts.length === 0 ? (
            <div className="alert alert-warning text-center py-5 my-4">
              <i className="bi bi-search display-4 d-block mb-3"></i>
              <h4>No se encontraron productos</h4>
              <p className="mb-0 text-muted">
                Intenta buscar con otra palabra o selecciona otra categoría.
              </p>
            </div>
          ) : (
            <div className="row">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;