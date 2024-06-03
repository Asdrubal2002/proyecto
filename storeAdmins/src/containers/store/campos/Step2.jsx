// src/components/Step2.js
import React from 'react';
import BotonNextStep from './BotonNextStep';

const Step2 = ({ nextStep, prevStep, handleChange, values, errors, errorEmail }) => {
  return (
    <div className="p-4 transition-opacity duration-500 ease-in-out opacity-100">
      <h2 className="text-xl font-bold mb-4">Paso 2: Información de Contacto de tu negocio</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Áreas de cobertura: *</label>
        <input
          type="text"
          value={values.location}
          onChange={handleChange('location')}
          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
          placeholder='barrios, ciudades donde mi tienda tiene alcance: barrio 1, barrio 2, ciudad 1, barrio 3, ......'

        />
        {errors.location && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.location}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Dirección de tu tienda fisica: (OPCIONAL)</label>
        <input
          type="text"
          value={values.address}
          onChange={handleChange('address')}
          placeholder='Dirección principal de tu tienda fisica: cll ##B ....'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.address && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.address}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Teléfono: *</label>
        <input
          type="text"
          value={values.phone}
          onChange={handleChange('phone')}
          placeholder='Teléfono de contacto de tu tienda: 34#$535&%9 inter 304, .....'
          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errors.phone && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Correo Electrónico: *</label>
        <input
          type="text"
          value={values.email}
          onChange={handleChange('email')}
          placeholder='Correo electrónico de contacto'

          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        />
        {errorEmail && (
          <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errorEmail}</p>
        )}
        {errors.email && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.email}</p>}
      </div>
      <button onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 font-medium hover:bg-gray-500">
        Anterior
      </button>
      <BotonNextStep nextStep={nextStep}/>
    </div>
  );
};

export default Step2;
