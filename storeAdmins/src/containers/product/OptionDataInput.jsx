import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { BookmarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Rings } from 'react-loader-spinner';

const OptionDataInput = ({ all_options, product, slug, get_products_options }) => {
    const [value, setValue] = useState('');
    const [optionId, setOptionId] = useState(null); // Valor por defecto para optionId
    const [quantity, setQuantity] = useState('');
    const [lowStockThreshold, setLowStockThreshold] = useState(''); // Estado para el umbral de stock bajo
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return all_options.filter(option => {
            if (option.option) {
                return option.option.value.toLowerCase().startsWith(inputValueLowerCase);
            } else {
                return option.value.toLowerCase().startsWith(inputValueLowerCase);
            }
        });
    };

    const onSuggestionSelected = async (event, { suggestion }) => {
        if (suggestion.option) {
            setValue(suggestion.option.value);
            setOptionId(suggestion.option.id); // Guardar el ID de la opción seleccionada
        } else {
            setValue(suggestion.value);
            setOptionId(suggestion.id); // Guardar el ID de la opción seleccionada
        }
    };

    const handleChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!value || !quantity || !lowStockThreshold) {
                // Si uno de los campos está vacío, mostrar un error y no enviar el formulario
                setError('Por favor complete todos los campos.');
                return;
            }

            // Validar que el umbral de stock bajo sea mayor a 1
            if (parseInt(lowStockThreshold) <= 1) {
                setError('El umbral de stock bajo debe ser mayor a 1.');
                return;
            }

            setLoading(true);
            setError(null);

            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const formData = new FormData();
            formData.append('value', value);
            formData.append('quantity', quantity);
            formData.append('low_stock_threshold', lowStockThreshold); // Agregar el umbral de stock bajo al formData
            formData.append('product', product.id);

            // Verificar si optionId no es null antes de agregarlo al formData
            if (optionId !== null) {
                formData.append('option', optionId);
            }

            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/create-option/`,
                        formData,
                        config
                    );

                    if (res.status === 201) {
                        setLoading(false);
                        get_products_options(slug);
                        setValue(''); // Reset value
                        setOptionId(null); // Reset optionId
                        setQuantity(''); // Reset quantity
                        setLowStockThreshold(''); // Reset lowStockThreshold
                    } else {
                        setLoading(false);
                    }
                } catch (err) {
                    setLoading(false);
                }
            };
            fetchData();
        } catch (err) {
            setError('Error al guardar la opción del producto.');
            setLoading(false);
        }
    };

    return (
        <div className='my-4'>
            <form onSubmit={handleSubmit} className="flex items-center w-full">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.option ? suggestion.option.value : suggestion.value}
                    renderSuggestion={suggestion => (
                        <div className="p-2 bg-gray-800 rounded m-1 flex cursor-pointer">
                            <BookmarkIcon width={20} height={20} color="#fff" radius="6" /> 
                            {suggestion.option ? suggestion.option.value : suggestion.value}
                        </div>
                    )}
                    inputProps={{
                        placeholder: 'Escriba una opción',
                        value,
                        onChange: handleChange,
                        className: "p-2 rounded-md focus:outline-none bg-gray-800 text-sm placeholder:text-gray-400 text-gray-200"
                    }}
                    onSuggestionSelected={onSuggestionSelected}
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Cantidad"
                    className="ml-2 p-2 rounded-md focus:outline-none bg-gray-800 text-sm placeholder:text-gray-400 text-gray-200"
                />
                <input
                    type="number"
                    value={lowStockThreshold}
                    onChange={e => setLowStockThreshold(e.target.value)}
                    placeholder="Umbral de stock bajo"
                    className="ml-2 p-2 rounded-md focus:outline-none bg-gray-800 text-sm placeholder:text-gray-400 text-gray-200"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="ml-2 px-4 py-2 bg-azul_corp text-white font-medium rounded-md hover:bg-azul_corp_ho focus:outline-none"
                >
                    <CheckIcon width={20} height={20} color="#fff" radius="6" />
                </button>
            </form>
            {loading && <p className="ml-2"><Rings width={30} height={30} color="#fff" radius="6" /></p>}
            {error && <p className="ml-2 text-red-500">{error}</p>}
        </div>
    );
};

export default OptionDataInput;
