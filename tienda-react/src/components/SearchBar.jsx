function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories 
}) {
  return (
    <div className="row g-3 mb-4 align-items-center">
      {/* 1. Input de búsqueda */}
      <div className="col-12 col-md-6">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            // Repaso JS: e.target.value contiene lo que el usuario acaba de escribir
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {/* Botón para limpiar búsqueda si hay texto escrito */}
          {searchTerm && (
            <button 
              className="btn btn-outline-secondary border-start-0" 
              type="button"
              onClick={() => onSearchChange("")}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* 2. Botones de Categorías */}
      <div className="col-12 col-md-6 d-flex gap-2 flex-wrap justify-content-md-end">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-sm ${
              selectedCategory === category 
                ? "btn-primary" 
                : "btn-outline-secondary"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;