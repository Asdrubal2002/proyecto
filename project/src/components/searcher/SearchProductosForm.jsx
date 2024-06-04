import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchProductosForm = ({ storeSlug }) => {
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
        <div className="max-w-lg mx-auto rounded-lg overflow-hidden font-estilo_letra">
            <div className="flex items-center space-x-0 mb-4">
                <button
                    onClick={handleSearch}
                    className="rounded-l-full bg-gray-700 text-white py-2 px-4 hover:bg-gray-800 focus:outline-none text-sm font-semibold "
                >
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                </button>
                <input
                    type="text"
                    placeholder="¿Que producto buscas?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-stone-800 py-2 pl-4 rounded-r-full text-gray-300 placeholder:text-gray-400 text-sm focus:outline-none w-full md:w-96 font-estilo_letra "
                />
            </div>
        </div>


    );
};

export default SearchProductosForm;
