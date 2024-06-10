// src/components/Step2.js
import React from 'react';
import BotonNextStep from './BotonNextStep';
import { Disclosure, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';


const Step2 = ({ nextStep, prevStep, handleChange, values, errors, errorEmail }) => {
  return (
    <div className="p-4 transition-opacity duration-500 ease-in-out opacity-100">
      <h2 className="text-xl font-bold mb-4">Paso 2: Información de Contacto de tu negocio</h2>
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">Localidades de cobertura: *</label>
          <input
            type="text"
            value={values.location}
            onChange={handleChange('location')}
            className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
            placeholder='barrios, ciudades donde mi tienda tiene alcance: barrio 1, barrio 2, ciudad 1, barrio 3, ......'
          />
          {errors.location && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.location}</p>}
        </div>
        <Disclosure>
          <Disclosure.Button className="flex items-center focus:outline-none my-2 text-sm text-gray-400">
            <InformationCircleIcon className="w-6 h-6 mx-2 text-yellow-400" />
            <strong className='text-yellow-400'>
              Tienes que especificar los nombres de las localidades donde tienes alcance. ¿Por qué?
            </strong>
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
              <div>
                <p className='text-sm '>
                  <p>
                    1- El buscador de Ruvlo se enfoca en las localidades que tienes registradas, asegurando que solo se muestren opciones disponibles y verificadas. Esto facilita a los usuarios encontrar servicios en sus áreas sin confusión.
                    <br />
                    <br />
                    2- Además, es una medida de seguridad para los envíos. Algunas áreas pueden estar afectadas por violencia o alteraciones que impiden la prestación segura de servicios. Al delimitar claramente las zonas de alcance, se protege tanto a los clientes como al personal de entrega, garantizando que las operaciones se realicen en lugares seguros y controlados.
                  </p>
                </p>
              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
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
        <label className="block text-sm font-medium text-gray-200">Teléfono de contacto: *</label>
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
      <BotonNextStep nextStep={nextStep} />
    </div>
  );
};

export default Step2;
