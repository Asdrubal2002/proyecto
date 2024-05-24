import React, { useState } from 'react';
import axios from 'axios';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'

const AssociateUserForm = ({
  get_partners,
  closePartners
}) => {
  const [email, setEmail] = useState('');
  const [identification, setIdentification] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!email || !identification) {
      setError('Ambos campos son obligatorios.');
      return;
    }

    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData();
    formData.append('email', email);
    formData.append('identification', identification);

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/store/associate-user-to-store/`,
        formData,
        config);

      if (res.status === 201) {
        setMessage(res.data.message || 'Usuario asociado con éxito.');
        setError('');
        get_partners();
        closePartners();
      } else {
        setError(res.data.error || 'Ocurrió un error al asociar el usuario.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Ocurrió un error al asociar el usuario.');
      } else {
        setError('Ocurrió un error al asociar el usuario.');
      }
    }
  };


  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-600">Asociar un colaborador</h2>
      <div className='m-4 '>
        <Disclosure>
          <Disclosure.Button className="focus:outline-none">
            <div className='flex text-gray-800 font-medium'>
            <InformationCircleIcon className="w-6 h-6 " /> ¿Que es asociar colaboradores?
            </div>
          
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="rounded-md p-2 text-gray-900 text-md bg-gray-300">
              Aquí puedes registrar a las personas que te ayudarán con tu negocio. Estas personas deben estar previamente registradas en Ruvlo y tener su perfil completamente actualizado. Solo necesitas ingresar el correo electrónico y la identificación que tienen registrados en su cuenta.            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>


      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm bg-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Identificación</label>
          <input
            type="text"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm bg-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-azul_corp text-white rounded-lg hover:bg-azul_corp_ho font-semibold"
        >
          Asociar usuario
        </button>

      </form>
      <button className="w-full py-2 mt-2 bg-red-400 text-white rounded-lg hover:bg-red-500 font-semibold" onClick={closePartners}>
        No tengo colaboradores
      </button>
    </div>
  );
};

export default AssociateUserForm;
