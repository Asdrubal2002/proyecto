import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import Autosuggest from 'react-autosuggest';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { get_categories } from '../../../../project/src/redux/actions/store_categories'
import { get_cities } from '../../redux/actions/cities/cities'
function Create({
  get_categories,
  categories,
  get_cities,
  cities
}) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    get_categories()
    window.scrollTo(0, 0);
    get_cities();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    slug: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    schedule: '',
    nit: '',
    city: '',
    city_id: '',
    url_pay: '',
    account_pay: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    category: '',
    slug: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    schedule: '',
    nit: '',
    city: '',
    city_id: '',
    url_pay: '',
    account_pay: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario aquí y actualizar formErrors
    const errors = validateForm(formData);
    setFormErrors(errors);

    // Solo enviar el formulario si no hay errores
    if (Object.values(errors).every(error => error === '')) {
      console.log('Formulario válido, enviando datos:', formData);
      // Aquí puedes enviar los datos del formulario
      //await update_user_location(formData.address_line_1,formData.address_line_2, formData.city_id, formData.postal_zip_code,formData.delivery_notes );

    } else {
      console.log('Formulario inválido, por favor revisa los campos');
    }
  };

  const validateForm = (formData) => {
    // Lógica de validación de campos aquí
    let errors = {
      name: '',
      category: '',
      slug: '',
      location: '',
      address: '',
      phone: '',
      email: '',
      schedule: '',
      nit: '',
      city: '',
      city_id: '',
      url_pay: '',
      account_pay: '',
    };


    // Ejemplo de validación de longitud mínima para la dirección principal

    if (formData.name.trim() === '') {
      errors.name = 'El nombre es obligatorio.';
    } else if (formData.name.trim().length > 20) {
      errors.name = 'El nombre no puede sobrepasar el límite de 20 caracteres.';
    }

    if (!formData.category) {
      errors.category = 'Por favor, selecciona una categoria';
    }
    if (!formData.slug) {
      errors.slug = 'Por favor, crea tu dirección';
    }
    if (!formData.location) {
      errors.location = 'Completa tu alcance de tiendas';
    }
    if (!formData.phone) {
      errors.phone = 'Completa tu teléfono';
    }
    if (!formData.email) {
      errors.email = 'Completa tu email';
    }
    if (!formData.schedule) {
      errors.schedule = 'Completa tu Horario';
    }
    if (!formData.schedule) {
      errors.schedule = 'Completa tu Horario';
    }
    if (!formData.city) {
      errors.city = 'Por favor, selecciona una ciudad';
    }






    return errors;
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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : cities.filter(city =>
        city.nombre.toLowerCase().slice(0, inputLength) === inputValue
      );
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.nombre;

  const renderSuggestion = (suggestion) => (
    <div className='mt-1 p-2 rounded-md w-full bg-azul_corp text-sm text-white'>
      {suggestion.nombre} - {suggestion.estado_o_departamento.nombre} - {suggestion.estado_o_departamento.pais.nombre}
    </div>
  );

  const inputProps = {
    placeholder: 'Escribe tu ciudad *',
    value: formData.city,
    className: 'bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm',
    onChange: (event, { newValue }) => {
      setFormData({
        ...formData,
        city: newValue
      });
    }
  };




  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-8 bg-stone-900 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Crear tu negocio</h2>
        <p className="text-sm text-gray-300 mb-8">
          La siguiente información será registrada como una nueva tienda dentro de Ruvlo. Por favor, ten en cuenta la importancia de los datos que proporcionas, ya que será la presentación de tu negocio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">


          <div>
            {/* <label htmlFor="name" className="block text-sm font-semibold text-gray-300 my-2">Nombre de la tienda</label> */}
            <input
              placeholder='Nombre de tu tienda *'
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="category" className="block text-sm font-semibold text-gray-300 my-2">Categoría de productos</label> */}
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-100 text-sm"
            >
              <option value="" disabled hidden>
                {formData.slug === '' ? '¿De productos vendes? *' : ''}
              </option>
              {
                categories &&
                categories !== null &&
                categories !== undefined &&
                categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
            {formErrors.category && (
              <p className="text-red-500 text-sm">{formErrors.category}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="slug" className="block text-sm font-semibold text-gray-300 my-2">¿Qué dirección quieres para tu identificación?</label> */}
            <div className="bg-stone-800 flex rounded-md shadow-sm  text-sm">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">ruvlo.com/</span>
              <input
                type="text"
                name="slug"
                id="slug"
                value={formData.slug}
                onChange={handleChange}
                className="rounded-md focus:outline-none focus:ring focus:ring-blue-500 flex-1 bg-transparent py-2 pl-1 pr-4 text-base text-gray-700 placeholder:text-gray-400 text-white text-sm"
                placeholder="dirección de ruvlo *"
              />
               
            </div>
            {formErrors.slug && (
              <p className="text-red-500 text-sm">{formErrors.slug}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="location" className="block text-sm font-semibold text-gray-300 my-2">Localidades de tu tienda</label> */}
            <input
              placeholder='Localidades de tu tienda *'
              type="text"
              id="location"
              name='location'
              value={formData.location}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm">{formErrors.location}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="address" className="block text-sm font-semibold text-gray-300 my-2">Dirección de tu tienda</label> */}
            <input
              placeholder='Dirección de tu tienda'
              type="text"
              id="address"
              name='address'
              value={formData.address}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
            
          </div>

          <div>
            {/* <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 my-2">Teléfono de tu tienda</label> */}
            <input
              placeholder='Teléfono de tu tienda *'
              type="text"
              id="phone"
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
             {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="email" className="block text-sm font-semibold text-gray-300 my-2">Correo de tu tienda</label> */}
            <input
              placeholder='Correo de tu tienda *'
              type="text"
              id="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
             {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div>
            {/* <label htmlFor="schedule" className="block text-sm font-semibold text-gray-300 my-2">Horario de atención</label> */}
            <input
              placeholder='Horario de atención'
              type="text"
              id="schedule"
              name='schedule'
              value={formData.schedule}
              onChange={handleChange}
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
             {formErrors.schedule && (
              <p className="text-red-500 text-sm">{formErrors.schedule}</p>
            )}
          </div>
          <div>
            {/* <label htmlFor="nit" className="block text-sm font-semibold text-gray-300 my-2">NIT, Identificador tributario</label> */}
            <input
              placeholder='NIT, Identificador tributario'
              type="text"
              id="nit"
              name='nit'
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
          </div>
          <div>
            {/* <label htmlFor="city" className="block text-sm font-semibold text-gray-300 my-2">Ciudad</label> */}
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={handleCitySelection} // Manejar la selección de la ciudad
            />
             {formErrors.city && (
              <p className="text-red-500 text-sm">{formErrors.city}</p>
            )}
          </div>
        </div>
        <br />
        <h2 className="text-base font-semibold leading-7 text-gray-300">Pagos</h2>
        <p className="mt-1 text-sm leading-6 text-gray-200 mb-4">
          Si tu tienda acepta métodos de pago como pasarelas de pago o transacciones bancarias, también podrás registrarlos. 
          Estos métodos se mostrarán al comprador según su elección, más adelante puedes llenarlo. </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* <label htmlFor="url_pay" className="block text-sm font-semibold text-gray-300 my-2">¿TIenes pasarela de pagos?</label> */}
            <input
              placeholder='¿TIenes pasarela de pagos?'
              type="text"
              name="url_pay"
              id="url_pay"
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
          </div>

          <div>
            {/* <label htmlFor="account_pay" className="block text-sm font-semibold text-gray-300 my-2">Cuenta bancaria transacciones</label> */}
            <input
              placeholder='Cuenta bancaria transacciones'
              type="text"
              name="account_pay"
              id="account_pay"
              className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end col-span-2 m-4">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold bg-azul_corp text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-700"
          >
            Crear negocio
          </button>
        </div>
      </form>
    </Layout>
  )
}

const mapStateToProps = state => ({
  categories: state.Store_Categories.categories,
  cities: state.Cities.cities


})

export default connect(mapStateToProps, {
  get_categories,
  get_cities
})(Create)
