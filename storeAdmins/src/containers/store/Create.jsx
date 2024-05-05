import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import Autosuggest from 'react-autosuggest';
import { get_categories } from '../../../../project/src/redux/actions/store_categories'
import { get_cities } from '../../redux/actions/cities/cities'

import { createStore } from '../../redux/actions/store/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import { Disclosure, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function Create({
  get_categories,
  categories,
  get_cities,
  cities,
  createStore,
  loading
}) {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

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
    description: '',
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
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData.nit)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario aquí y actualizar formErrors
    const errors = validateForm(formData);
    setFormErrors(errors);

    // Solo enviar el formulario si no hay errores
    if (Object.values(errors).every(error => error === '')) {
      console.log('Formulario válido, enviando datos:', formData);

      await createStore(
        formData.name,
        formData.category,
        formData.description,
        formData.location,
        formData.address,
        formData.phone,
        formData.email,
        formData.schedule,
        formData.nit,
        formData.url_pay,
        formData.account_pay,
        formData.slug,
        formData.city_id,
      )
      // navigate('/store'); // Reemplaza '/store' con la URL real de la página de la tienda
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
      description: '',
    };


    // Ejemplo de validación de longitud mínima para la dirección principal

    if (formData.name.trim() === '') {
      errors.name = 'El nombre es obligatorio.';
    } else if (formData.name.trim().length > 20) {
      errors.name = 'El nombre no puede sobrepasar el límite de 20 caracteres.';
    } else if (/[^\w\s]/.test(formData.name)) {
      errors.name = 'El nombre no puede contener símbolos';
    }

    if (!formData.category) {
      errors.category = 'Por favor, selecciona una categoria';
    }

    if (!formData.slug) {
      errors.slug = 'Por favor, crea tu dirección';
    } else if (/\s/.test(formData.slug)) {
      errors.slug = 'La dirección no puede contener espacios';
    } else if (/[A-Z]/.test(formData.slug)) {
      errors.slug = 'La dirección no puede contener letras mayúsculas';
    } else if (/[^\w\s]/.test(formData.slug)) {
      errors.slug = 'La dirección no puede contener símbolos';
    }else if(formData.slug.trim().length > 200){
      errors.slug = 'La dirección no puede contener mas de 200 caracteres';
    }

    if (!formData.location) {
      errors.location = 'Completa tu alcance de tiendas';
    }else if(formData.location.trim().length > 500){
      errors.location = 'La locación no puede contener mas de 100 caracteres';
    }

    if (formData.address.trim().length > 100) {
      errors.address = 'la dirección de la tienda no puede contener mas de 100 caracteres';
    } 

    if (!formData.phone) {
      errors.phone = 'Completa tu teléfono';
    } else if(formData.phone.trim().length > 10){
      errors.phone = 'El télefono no puede contener mas de 10 caracteres';
    }

    if (!formData.email) {
      errors.email = 'Completa tu email';
    }else if(formData.email.trim().length > 100){
      errors.email = 'El correo no puede contener mas de 100 caracteres';
    }

    if (!formData.schedule) {
      errors.schedule = 'Completa tu Horario';
    }else if(formData.schedule.trim().length > 100){
      errors.schedule = 'El horario no puede contener mas de 100 caracteres';
    }

    if (formData.nit.trim().length > 100) {
      errors.nit = 'El nit no puede contener más de 100 caracteres';
    } else if (/\./.test(formData.nit)) {
      errors.nit = 'El nit no puede contener puntos';
    }
    

    if (!formData.city) {
      errors.city = 'Por favor, selecciona una ciudad';
    }

    if (formData.description.trim() === '') {
      errors.description = 'La descripción es obligatorio.';
    } else if (formData.description.trim().length > 500) {
      errors.description = 'La descripción no sobrepasar el límite de 500 caracteres.';
    }

    if (formData.url_pay.trim().length > 100) {
      errors.url_pay = 'La URL no puede contener mas de 100 caracteres';
    }

    if (formData.account_pay.trim().length > 100) {
      errors.account_pay = 'La cuenta bancaria no puede contener mas de 100 caracteres';
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

    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-8 bg-stone-900 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">Crea tu negocio</h2>
      <p className="text-sm text-gray-300 mb-8">
        La siguiente información será registrada como una nueva tienda dentro de Ruvlo. Por favor, ten en cuenta la importancia de los datos que proporcionas, ya que será la presentación de tu negocio.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* nombre */}
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
        {/* nombre */}

        {/* categoria */}
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
        {/* categoria */}

        {/* dirección */}
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

          <Disclosure>
            <Disclosure.Button className="flex items-center focus:outline-none my-4 text-sm text-gray-400">
              <InformationCircleIcon className="w-6 h-6  mx-2" /> ¿Que es dirección de ruvlo?
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="rounded-md  text-sm">
                <div>
                  <p>
                    Define la ruta única para tu tienda en Ruvlo. Esta ruta será tu identificador exclusivo y te ayudará a ser encontrado por tus clientes.
                  </p>
                  <br />
                  <p className='text-yellow-400'>
                    Por ejemplo, para una tienda llamada <strong>{formData.name}</strong>, la ruta podría
                    ser: <strong>{formData.name.toLowerCase().replace(/[^\w\s]/gi, '')}</strong>. Es solo un ejemplo,
                    puedes poner la dirección que te guste para tu tienda.
                  </p>
                </div>



              </Disclosure.Panel>
            </Transition>
          </Disclosure>

          {formErrors.slug && (
            <p className="text-red-500 text-sm">{formErrors.slug}</p>
          )}
        </div>
        {/* dirección */}

        {/* Localidades */}
        <div>
          {/* <label htmlFor="location" className="block text-sm font-semibold text-gray-300 my-2">Localidades de tu tienda</label> */}
          <input
            placeholder='Localidades. Barrio 1 - Barrio 2 - Ciudad 1 - Ciudad 2'
            type="text"
            id="location"
            name='location'
            value={formData.location}
            onChange={handleChange}
            className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
          />

          <Disclosure>
            <Disclosure.Button className="flex items-center focus:outline-none my-4 text-sm text-gray-400">
              <InformationCircleIcon className="w-6 h-6  mx-2" /> ¿Que es Localidades?
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="rounded-md text-sm">
                <p>
                  Por favor, indica las localidades donde tu negocio tiene presencia o donde ofrecerás servicios de entrega a domicilio.
                </p>
                <br />
                <p>
                  Si tu negocio abarca toda una ciudad, simplemente escribe el nombre de la ciudad.
                  Si solo haces domicilios en algunas localidades específicas, menciona detalladamente cuáles son.
                </p>
                <br />
                <p className='text-yellow-400 font-medium'>
                  <strong>Por ejemplo</strong>, si tu negocio entrega a domicilio en algunos barrios de Bogotá, menciona esos barrios específicos seguidos de comas o guiones.
                  Si abarca toda la ciudad de Bogotá, basta con escribir 'Bogotá'.
                </p>
              </Disclosure.Panel>
            </Transition>
          </Disclosure>

          {formErrors.location && (
            <p className="text-red-500 text-sm">{formErrors.location}</p>
          )}
        </div>
        {/* Localidades */}

        {/* Dirección de la tienda */}
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
           {formErrors.address && (
            <p className="text-red-500 text-sm">{formErrors.address}</p>
          )}
        </div>
        {/* Dirección de la tienda */}

        {/* telefono de la tienda */}
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
        {/* telefono de la tienda */}

        {/* email de la tienda */}
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
        {/* email de la tienda */}

        {/* horario de la tienda */}
        <div>
          {/* <label htmlFor="schedule" className="block text-sm font-semibold text-gray-300 my-2">Horario de atención</label> */}
          <input
            placeholder='Horario de atención *'
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
        {/* horario de la tienda */}

        {/* nit de la tienda */}
        <div>
          {/* <label htmlFor="nit" className="block text-sm font-semibold text-gray-300 my-2">NIT, Identificador tributario</label> */}
          <input
            placeholder='NIT, Identificador tributario sin puntos'
            type="text"
            id="nit"
            name='nit'
            value={formData.nit}
            onChange={handleChange}
            className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
          />
            {formErrors.nit && (
            <p className="text-red-500 text-sm">{formErrors.nit}</p>
          )}
        </div>
        {/* nit de la tienda */}

        {/* ciudad de la tienda */}
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
        {/* ciudad de la tienda */}

      </div>

      {/* descripcion de la tienda */}
      <div>
        {/* <label htmlFor="nit" className="block text-sm font-semibold text-gray-300 my-2">NIT, Identificador tributario</label> */}
        <textarea
          placeholder='Presenta tu tienda *'
          type="text"
          id="description"
          name='description'
          value={formData.description}
          onChange={handleChange}
          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
        />
        {formErrors.description && (
          <p className="text-red-500 text-sm">{formErrors.description}</p>
        )}
      </div>
      {/* descripcion de la tienda */}


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
            value={formData.url_pay}
            onChange={handleChange}
            className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
          />
          {formErrors.url_pay && (
            <p className="text-red-500 text-sm">{formErrors.url_pay}</p>
          )}
        </div>

        <div>
          {/* <label htmlFor="account_pay" className="block text-sm font-semibold text-gray-300 my-2">Cuenta bancaria transacciones</label> */}
          <input
            placeholder='Cuenta bancaria transacciones'
            type="text"
            name="account_pay"
            id="account_pay"
            value={formData.account_pay}
            onChange={handleChange}
            className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
          />
          {formErrors.account_pay && (
            <p className="text-red-500 text-sm">{formErrors.account_pay}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end col-span-2 m-4">

        {
          loading ? (
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-azul_corp text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-700"
            >
              <Rings width={20} height={20} color="#fff" radius="6" />
            </button>

          ) : (
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-azul_corp text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-700"
            >
              Registrar datos basicos de tu tienda
            </button>
          )
        }

      </div>
    </form>
  )
}

const mapStateToProps = state => ({
  categories: state.Store_Categories.categories,
  cities: state.Cities.cities,
  loading: state.Store.loading


})

export default connect(mapStateToProps, {
  get_categories,
  get_cities,
  createStore
})(Create)
