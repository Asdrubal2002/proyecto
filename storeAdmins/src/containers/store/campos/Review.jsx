// src/components/Review.js
import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Review = ({ prevStep, handleSubmit, values, errorSlug, errorEmail, user }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Estos son los datos que has ingresado para registrar una nueva tienda llamada {values.name}. Por favor, revísalos</h2>
        <div className="mb-8 p-4 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Nombre de mi tienda: <strong className="text-white">{values.name}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Categoría de mi tienda: <strong className="text-white">{values.category_name}</strong></p>
            </div>
            {errorSlug ? (
              <div className="flex items-center">
                <ExclamationIcon className="w-6 h-6 mx-2 text-red-500" />
                <p className="text-red-400">Ya hay una tienda registrada con esta dirección <strong className="text-white">{values.slug}</strong>. Por favor, cámbiala</p>
              </div>
            ) : (
              <div className="flex items-center">
                <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
                <p className="text-yellow-400">Usuario o ruta especial de mi tienda: <strong className="text-white">{values.slug}</strong></p>
              </div>
            )}
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Localidades donde tiene alcance mi tienda: <strong className="text-white">{values.location}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Dirección de mi tienda: <strong className="text-white">{values.address ? values.address : 'No tienes, no ingresaste datos'}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Teléfono de contacto: <strong className="text-white">{values.phone}</strong></p>
            </div>
            {errorEmail ? (
              <div className="flex items-center">
                <ExclamationIcon className="w-6 h-6 mx-2 text-red-500" />
                <p className="text-red-400">Ya hay una tienda registrada con este correo <strong className="text-white">{values.email}</strong>. Por favor, cámbialo</p>
              </div>
            ) : (
              <div className="flex items-center">
                <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
                <p className="text-yellow-400">Correo Electrónico: <strong className="text-white">{values.email}</strong></p>
              </div>
            )}
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Franja horaria de servicio: <strong className="text-white">{values.schedule}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Identificación tributaria: <strong className="text-white">{values.nit ? values.nit : 'No tienes, no ingresaste datos'}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Ciudad: <strong className="text-white">{values.city}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">URL de Pago o pasarela de pago: <strong className="text-white">{values.url_pay ? values.url_pay : 'No tienes, no ingresaste datos'}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Cuenta bancaria para pagos: <strong className="text-white">{values.account_pay ? values.account_pay : 'No tienes, no ingresaste datos'}</strong></p>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 mx-2 text-green-500" />
              <p className="text-yellow-400">Presentación de mi tienda: <strong className="text-white">{values.description}</strong></p>
            </div>
          </div>
          <div className='mt-6 '>
            <p>
            "Estamos felices de que tú, {user.firs_name} {user.last_name}, estés a punto de embarcarte en una emocionante nueva aventura con Ruvlo. ¡Bienvenido a bordo! Vamos a validar la información proporcionada y, si todo está correcto, crearemos tu tienda para que puedas empezar a construir tu camino hacia el éxito."
            </p>

          </div>
        </div>

      <button onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 font-medium hover:bg-gray-500">
        Anterior
      </button>
      <button onClick={handleSubmit} className="bg-azul_corp text-white px-4 py-2 rounded-md hover:bg-azul_corp_ho font-medium">
        Validar información
      </button>
    </div>
  );
};

export default Review;
