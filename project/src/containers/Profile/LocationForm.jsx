import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { get_cities } from '../../redux/actions/cities';
import { connect } from 'react-redux';
import { update_user_location } from '../../redux/actions/profile';

function LocationForm({ get_cities, cities, update_user_location }) {
    useEffect(() => {
        get_cities();
    }, []);

    const [formData, setFormData] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        city_id: '', // Agregar campo para almacenar el ID de la ciudad seleccionada
        postal_zip_code: '',
        delivery_notes: ''
    });

    const [formErrors, setFormErrors] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        postal_zip_code: '',
        delivery_notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCitySelection = (event, { suggestion }) => {
        if (suggestion) {
            // Actualizar el estado con el nombre de la ciudad y su ID
            setFormData({
                ...formData,
                city: suggestion.nombre,
                city_id: suggestion.id
            });
        } else {
            // Limpiar el campo de ciudad y su ID si no se selecciona ninguna sugerencia
            setFormData({
                ...formData,
                city: '',
                city_id: ''
            });
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Validar el formulario aquí y actualizar formErrors
        const errors = validateForm(formData);
        setFormErrors(errors);

        // Solo enviar el formulario si no hay errores
        if (Object.values(errors).every(error => error === '')) {
            console.log('Formulario válido, enviando datos:', formData);
            console.log(formData.address_line_1,formData.address_line_2, formData.city_id, formData.postal_zip_code,formData.delivery_notes )
            // Aquí puedes enviar los datos del formulario
            await update_user_location(formData.address_line_1,formData.address_line_2, formData.city_id, formData.postal_zip_code,formData.delivery_notes );

        } else {
            console.log('Formulario inválido, por favor revisa los campos');
        }
    };


    const validateForm = (formData) => {
        // Lógica de validación de campos aquí
        let errors = {
            address_line_1: '',
            address_line_2: '',
            city: '',
            postal_zip_code: '',
            delivery_notes: ''
        };

        // Ejemplo de validación de longitud mínima para la dirección principal
        if (!formData.city) {
            errors.city = 'Por favor, selecciona una ciudad';
        }
    

        if (formData.address_line_1.trim() === '') {
            errors.address_line_1 = 'La dirección principal es obligatoria.';
        } else if (formData.address_line_1.trim().length > 50) {
            errors.address_line_1 = 'La dirección principal no puede sobrepasar el límite de 20 caracteres.';
        }

        if (formData.address_line_2.trim().length > 50) {
            errors.address_line_2 = 'La dirección secundaria no puede sobrepasar el limite.';
        }

        
        if (formData.postal_zip_code.trim().length > 0 && formData.postal_zip_code.trim().length > 5) {
            errors.postal_zip_code = 'El código postal no puede tener más de 5 caracteres';
        }
        
        // Validación de notas de entrega
        if (formData.delivery_notes.trim().length > 100) {
            errors.delivery_notes = 'Las notas de entrega no pueden exceder los 100 caracteres';
        }

        // Más lógica de validación aquí para otros campos...

        return errors;
    };

    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : cities.filter(city =>
                city.nombre.toLowerCase().slice(0, inputLength) === inputValue
            );
    };

    const getSuggestionValue = (suggestion) => suggestion.nombre;

    const renderSuggestion = (suggestion) => (
        <div className='mt-1 p-2 rounded-md w-full bg-blue-300'>
            {suggestion.nombre} - {suggestion.estado_o_departamento.nombre} - {suggestion.estado_o_departamento.pais.nombre}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Escribe tu ciudad *',
        value: formData.city,
        onChange: (event, { newValue }) => {
            setFormData({
                ...formData,
                city: newValue
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
                {/* <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad *</label> */}
                <div className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500 sm:text-sm sm:leading-6 text-stone-800">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={handleCitySelection} // Manejar la selección de la ciudad
                    />
                </div>
                {formErrors.city && (
                    <p className="text-red-500 text-sm">{formErrors.city}</p>
                )}
            </div>
            <div className="mb-4">
                {/* <label htmlFor="address_line_1" className="block text-sm font-medium text-gray-700">Dirección principal *</label> */}
                <input
                    type="text"
                    id="address_line_1"
                    name="address_line_1"
                    value={formData.address_line_1}
                    onChange={handleChange}
                    placeholder='Dirección principal *'
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.address_line_1 && (
                    <p className="text-red-500 text-sm">{formErrors.address_line_1}</p>
                )}
            </div>
            <div className="mb-4">
                {/* <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">Dirección secundaria</label> */}
                <input
                    type="text"
                    id="address_line_2"
                    name="address_line_2"
                    value={formData.address_line_2}
                    onChange={handleChange}
                    placeholder='Dirección secundaria'
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.address_line_2 && (
                    <p className="text-red-500 text-sm">{formErrors.address_line_2}</p>
                )}
            </div>
            <div className="mb-4">
                {/* <label htmlFor="postal_zip_code" className="block text-sm font-medium text-gray-700">Código postal</label> */}
                <input
                    type="text"
                    id="postal_zip_code"
                    name="postal_zip_code"
                    value={formData.postal_zip_code}
                    onChange={handleChange}
                    placeholder='Código postal'
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.postal_zip_code && (
                    <p className="text-red-500 text-sm">{formErrors.postal_zip_code}</p>
                )}
            </div>
           
            <div className="mb-4">
                {/* <label htmlFor="delivery_notes" className="block text-sm font-medium text-gray-700">Notas que quieras agregar</label> */}
                <textarea
                    id="delivery_notes"
                    name="delivery_notes"
                    value={formData.delivery_notes}
                    onChange={handleChange}
                    placeholder='Notas que quieras agregar'
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.delivery_notes && (
                    <p className="text-red-500 text-sm">{formErrors.delivery_notes}</p>
                )}
            </div>
            <button type="submit" className="text-sm font-semibold w-full bg-azul_corp text-white py-2 px-4 rounded-md hover:bg-azul_corp_ho focus:outline-none focus:bg-azul_corp">
                Registrar dirección
            </button>
        </form>
    );
}

const mapStateToProps = (state) => ({
    cities: state.Cities.cities
});

export default connect(mapStateToProps, {
    get_cities,
    update_user_location
})(LocationForm);
