import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ storeSlug }) => {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!name && !minPrice && !maxPrice) {
      // Si todos los campos están vacíos, no hacer nada
      return;
    }

    // Eliminar puntos y comas de los precios si fueron ingresados con ellos
    const normalizedMinPrice = minPrice ? minPrice.replace(/[.,]/g, '') : '';
    const normalizedMaxPrice = maxPrice ? maxPrice.replace(/[.,]/g, '') : '';

    const query = `?name=${encodeURIComponent(name || '')}&minPrice=${normalizedMinPrice || ''}&maxPrice=${normalizedMaxPrice || ''}`;
    navigate(`/products_filtered/${storeSlug}${query}`);
  };

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Filtrar Productos</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md py-2 px-4 focus:outline-none bg-stone-900 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Precio Mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-md py-2 px-4 focus:outline-none bg-stone-900 text-sm"
        />
        <input
          type="number"
          placeholder="Precio Máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-md py-2 px-4 focus:outline-none bg-stone-900 text-sm"
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 bg-azul_corp text-white rounded-md py-2 px-4 hover:bg-azul_corp_ho focus:outline-none text-sm font-semibold"
      >
        Filtrar productos requeridos
      </button>
    </div>
  );
};

export default SearchForm;
