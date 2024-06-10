// src/components/Step3.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import BotonNextStep from './BotonNextStep';

const Step3 = ({ nextStep, prevStep, handleChange, values, errors, cities, setFormData }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleCitySelection = (event, { suggestion }) => {
    if (suggestion) {
      // Actualizar el estado con el nombre de la ciudad y su ID
      setFormData({
        ...values,
        city: suggestion.nombre,
        city_id: suggestion.id
      });
    } else {
      // Limpiar el campo de ciudad y su ID si no se selecciona ninguna sugerencia
      setFormData({
        ...values,
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
    <div className='mt-1 p-2 rounded-md w-full bg-azul_corp text-sm text-white cursor-pointer'>
      {suggestion.nombre} - {suggestion.estado_o_departamento.nombre} - {suggestion.estado_o_departamento.pais.nombre}
    </div>
  );

  const inputProps = {
    placeholder: 'Escribe tu ciudad *',
    value: values.city,
    className: 'bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm',
    onChange: (event, { newValue }) => {
      setFormData({
        ...values,
        city: newValue
      });
    }
  };


  return (
    <div className="p-4 transition-opacity duration-500 ease-in-out opacity-100">
      <h2 className="text-xl font-bold mb-4">Paso 3: Información Adicional</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Horario de servicio: *</label>
        <input
          type="text"
          value={values.schedule}
          onChange={handleChange('schedule')}
          placeholder='Franaja horaria del servicio de mi tienda: Lunes a viernes 7Am a 4:55Pm'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.schedule && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.schedule}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">NIT: (OPCIONAL)</label>
        <input
          type="text"
          value={values.nit}
          onChange={handleChange('nit')}
          placeholder='Identificador de tributación que tienes registrado en tu tienda'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.nit && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.nit}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Selecciona la ciudad: *</label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={handleCitySelection} // Manejar la selección de la ciudad
        />
        {errors.city && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.city}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">URL de Pago: (OPCIONAL)</label>
        <input
          type="text"
          value={values.url_pay}
          onChange={handleChange('url_pay')}
          placeholder='Link de la pasarela de pagos si tienes, ejemplo wompi, kiire, stripe. ....'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.url_pay && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.url_pay}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Cuenta de Pago: (OPCIONAL)</label>
        <input
          type="text"
          value={values.account_pay}
          onChange={handleChange('account_pay')}
          placeholder='Número de cuenta bancarioa para selección de transferencias'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.account_pay && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.account_pay}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Descripción: *</label>
        <textarea
          value={values.description}
          onChange={handleChange('description')}
          placeholder='Esta descripción aparecerá en el perfil inicial de tu tienda.'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.description && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.description}</p>}
      </div>
      <button onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 font-medium hover:bg-gray-500">
        Anterior
      </button>
      <BotonNextStep nextStep={nextStep}/>
    </div>
  );
};

export default Step3;
