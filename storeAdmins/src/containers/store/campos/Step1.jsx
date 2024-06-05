// src/components/Step1.js
import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ForwardIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import BotonNextStep from './BotonNextStep';

const Step1 = ({ nextStep, handleChange, values, errors, categories, errorSlug, formData, setFormData }) => {
  return (
    <div className="p-4 transition-opacity duration-500 ease-in-out opacity-100">
      <h2 className="text-xl font-bold mb-6">Paso 1: Información Básica sobre tu negocio</h2>
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">Nombre de tienda *</label>
          <input
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white text-sm"
            placeholder='Ejemplo: Mi Tienda'
          />
          {errors.name && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.name}</p>}
        </div>
        <Disclosure>
          <Disclosure.Button className="flex items-center focus:outline-none my-2 text-sm text-gray-400">
            <InformationCircleIcon className="w-6 h-6 mx-2 text-yellow-400" />
            <strong className='text-yellow-400'>
              Información adicional sobre el nombre de mi tienda
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
                  El nombre que elijas para tu tienda será permanente, a menos que solicites un cambio, sujeto a las políticas de cambio de nombre dentro de Ruvlo.
                </p>
              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>

      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Categoría: *</label>
        <select
          value={formData.category}
          onChange={(e) => {
            const selectedCategoryId = e.target.value;
            const selectedCategory = categories[selectedCategoryId - 1]; // Suponiendo que los IDs comienzan desde 1
            setFormData({
              ...formData,
              category: selectedCategoryId,
              category_name: selectedCategory ? selectedCategory.name : '',
            });
          }}
          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
        >
          <option value="" disabled hidden>
            {formData.category === '' ? 'Categoría de tu negocio *' : ''}
          </option>
          {categories &&
            categories.map((category, index) => (
              <option key={index + 1} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        {errors.category && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.category}</p>}

        <Disclosure>
          <Disclosure.Button className="flex items-center focus:outline-none my-2 text-sm text-gray-400">
            <InformationCircleIcon className="w-6 h-6 mx-2 text-yellow-400" />
            <strong className='text-yellow-400'>
              Información adicional sobre la categoria de mi tienda
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
                <p className='text-sm'>
                  La categoría que elijas para tu tienda será permanente, a menos que solicites un cambio, sujeto a las políticas de cambio de categoría de Ruvlo.
                </p>
              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Usuario de tu tienda: *</label>
        <input
          type="text"
          value={values.slug}
          onChange={handleChange('slug')}
          className="bg-stone-800 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 text-sm"
          placeholder='Ejemplo: mitienda'
        />
        {errors.slug && <p className="text-gray-200 bg-red-800 p-2 rounded-md text-sm">{errors.slug}</p>}
        {errorSlug && (
          <p className='text-gray-200 bg-red-800 p-2 rounded-md text-sm'>Ya hay una tienda registrada con esta dirección. Cambiala</p>
        )}

        <Disclosure>
          <Disclosure.Button className="flex items-center focus:outline-none my-4 text-sm text-gray-400">
            <InformationCircleIcon className="w-6 h-6 mx-2 text-yellow-400" />
            <strong className='text-yellow-400'>
              ¿Que es el usuario de mi tienda en ruvlo?
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
            <Disclosure.Panel className="rounded-md  text-sm">
              <div>
                <p>
                  Define el usuario único para tu tienda en Ruvlo. Este usuario será tu identificador exclusivo y te ayudará a ser encontrado por tus clientes.                        </p>
                <br />

              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
        <p className='font-medium text-sm'>
          Por ejemplo, para una tienda llamada <strong className='text-yellow-400'>{values.name}</strong>, el usuario podría
          ser: <strong className='text-yellow-400'>{values.name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '')}</strong>.
          Ten en cuenta que el usuario no puede contener espacios, mayúsculas, símbolos. Es solo un ejemplo, puedes registrar la dirección que te guste para tu tienda bajo los parametros establecidos.
        </p>
      </div>
     <BotonNextStep nextStep={nextStep}/>
    </div>
  );
};

export default Step1;
