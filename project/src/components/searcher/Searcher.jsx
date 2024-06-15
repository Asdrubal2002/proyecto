import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { get_categories } from '../../redux/actions/store_categories';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'


function Searcher({ get_categories, categories }) {
    const navigate = useNavigate();

    // Estado para almacenar los resultados de la búsqueda en tiempo real
    const [searchResults, setSearchResults] = useState([]);

    // Efecto para cargar las categorías al montar el componente
    useEffect(() => {
        get_categories();
        window.scrollTo(0, 0);
    }, [get_categories]);

    // Estado para el formulario de búsqueda
    const [formData, setFormData] = useState({
        search: '',
        slug: ''
    });

    // Estado para el mensaje de error
    const [error, setError] = useState('');

    // Función para manejar el cambio en los inputs
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Función para enviar el formulario de búsqueda
    const onSubmit = e => {
        e.preventDefault();
        if (!formData.search) {
            setError("Por favor, escribe un término de búsqueda.");
            return;
        }
        let filledSlug = formData.slug || 'categories';
        navigate(`/search/${filledSlug}/${formData.search}`);
    };

    // Función para obtener los resultados de la búsqueda en tiempo real
    const handleSearchChange = useCallback(
        debounce(async (value) => {
            if (!value) {
                setSearchResults([]); // Limpiar los resultados si el campo de búsqueda está vacío
                return;
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/store/search-online?q=${value}`);
                setSearchResults(response.data.search_stores); // Almacenar los resultados en el estado
            } catch (error) {
                console.error("Error al obtener los resultados de búsqueda en tiempo real:", error);
            }
        }, 200),
        []
    );

    // Función para manejar el cambio en el input de búsqueda
    const onSearchChange = e => {
        const { value } = e.target;
        setFormData({ ...formData, search: value }); // Actualizar el estado del formulario con el valor de búsqueda
        handleSearchChange(value); // Llamar a la función de búsqueda con debounce
    };

    return (
        <>
            <div className="relative mt-2 flex items-center">
                <form onSubmit={onSubmit} className="flex items-center flex-1">
                    <select
                        name='slug'
                        onChange={onChange}
                        className="bg-stone-700 py-2 pl-4 pr-2 rounded-l-full text-gray-300 text-sm leading-5 focus:outline-none w-1/3 cursor-pointer font-estilo_letra"
                        value={formData.slug}
                    >
                        <option value="" disabled hidden>
                            {formData.slug === '' ? '¿Que buscas?' : ''}
                        </option>
                        {categories && categories.map((category, index) => (
                            <option key={index} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="search"
                        onChange={onSearchChange}
                        value={formData.search}
                        className="
                flex-1
                bg-stone-800
                py-2
                pl-4
                rounded-r-full
                text-gray-300
                placeholder:text-gray-400
                text-sm
                focus:outline-none
                w-full
                md:w-96
                font-estilo_letra
                "
                        placeholder="Busca tu localidad, barrio, estado, tienda"
                    />
                </form>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                {searchResults.length > 0 && (
                    <div className="absolute top-full w-full ">
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index} className="bg-stone-600 p-2 shadow-sm flex items-center">
                                    <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                                    {result.location} - {result.city.nombre}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    categories: state.Store_Categories.categories,
});

export default connect(mapStateToProps, {
    get_categories,
})(Searcher);
