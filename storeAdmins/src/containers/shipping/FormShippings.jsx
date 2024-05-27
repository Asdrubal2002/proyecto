import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import { get_shippings, create_shippings, delete_shipping, change_status_shipping, update_shipping } from '../../redux/actions/shipping/shippings';
import { Rings } from 'react-loader-spinner';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/24/outline';



function FormShippings({
  get_shippings,
  loading,
  shippings,
  create_shippings,
  delete_shipping,
  change_status_shipping,
  update_shipping
}) {

  useEffect(() => {
    get_shippings()
  }, []);

  const initialFormData = {
    name: '',
    time_to_delivery: '',
    price: '',
    additional_notes: ''
  };

  const [formData, setFormData] = useState(initialFormData);


  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false)
  const [shippingIdToDelete, setShippingIdToDelete] = useState(null);
  const [editingShippingId, setEditingShippingId] = useState(null);
  const [messageEdit, setMessageEdit] = useState(false);


  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (formData.name.length > 50) {
      errors.name = 'El nombre no puede exceder los 50 caracteres';
    }

    if (formData.additional_notes.length > 400) {
      errors.additional_notes = 'El nombre no puede exceder los 400 caracteres';
    }

    if (!formData.time_to_delivery.trim()) {
      errors.time_to_delivery = 'El tiempo de entrega es requerido';
    } else if (formData.time_to_delivery.length > 40) {
      errors.time_to_delivery = 'El tiempo de entrega no puede exceder los 40 caracteres';
    }
    // Validar el precio
    if (formData.price && !/^\d+$/.test(formData.price)) {
      errors.price = 'El precio debe ser un número sin puntos ni comas';
    } else if (formData.price && parseFloat(formData.price) > 1000000) {
      errors.price = 'El precio no puede ser mayor a 1000000';
    }
    setFormErrors(errors);

    // Si hay errores, detén el envío del formulario
    if (Object.keys(errors).length === 0) {
      // Aquí puedes enviar los datos del formulario
      // Por ejemplo:
      // sendFormData(formData);


      if (editingShippingId) {
        // Llamar a la función para editar la categoría
        await update_shipping(editingShippingId, formData.name, formData.time_to_delivery, formData.price, formData.additional_notes)
        get_shippings()
        clearFormData()



      } else {
        // Llamar a la función para crear un nuevo método
        await create_shippings(formData.name, formData.time_to_delivery, formData.price, formData.additional_notes)
        get_shippings()
        setFormData(initialFormData);
      }
    } else {
      // Si hay errores, no envíes los datos
      console.log('El formulario contiene errores. No se enviará.');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validar el nombre: no debe contener símbolos ni números
    setErrorMessage('');
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'price') {
      // Eliminar puntos y comas del valor
      newValue = value.replace(/[.,]/g, '');
    }
  };

  const handleOpenModal = (shippingId) => {
    setShippingIdToDelete(shippingId);
    setOpen(true);
  };

  const handleDelete = async (shippingId) => {
    await delete_shipping(shippingId)
    setOpen(false);
    get_shippings()
  }

  const handleToggleActive = async (shippingId) => {
    await change_status_shipping(shippingId)
    get_shippings()
  }

  // Función para establecer los valores predefinidos
  const handleEditModal = (shipping) => {
    // Establecer los valores predefinidos en el estado formData
    window.scrollTo(0, 0);
    setFormData({
      name: shipping.name,
      time_to_delivery: shipping.time_to_delivery,
      price: shipping.price,
      additional_notes: shipping.additional_notes
    });

    setEditingShippingId(shipping.id);
    setMessageEdit(true)
  };

  // Función para limpiar el formulario
  const clearFormData = () => {
    setFormData(initialFormData);
    setMessageEdit(false)
    setEditingShippingId(null)
  };


  return (
    <div>
      <form onSubmit={onSubmit} className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre de entrega *</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombra a tu método"
            className="placeholder:text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="time_to_delivery" className="block text-sm font-medium text-gray-300">Tiempo estimado de entrega *</label>
          <input
            type="text"
            name="time_to_delivery"
            id="time_to_delivery"
            placeholder="Tiempo estimado"
            className="placeholder:text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.time_to_delivery}
            onChange={handleChange}
          />
          {formErrors.time_to_delivery && (
            <p className="text-red-500 text-sm mt-1">{formErrors.time_to_delivery}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">Precio</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Precio"
            className="placeholder:text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.price}
            onChange={handleChange}
          />
          {formErrors.price && (
            <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-300">Notas adicionales</label>
          <textarea
            name="additional_notes"
            id="additional_notes"
            placeholder="Notas adicionales"
            className="placeholder:text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.additional_notes}
            onChange={handleChange}
          />
          {formErrors.additional_notes && (
            <p className="text-red-500 text-sm mt-1">{formErrors.additional_notes}</p>
          )}
        </div>
        <div className="flex">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-azul_corp hover:bg-azul_corp_ho"
          >
            Guardar Método
          </button>
          {
            messageEdit ? <>
              <button onClick={() => clearFormData()} className="m-2 text-gray-100 text-sm bg-red-500 px-2 rounded-md font-medium">Cancelar la edición.</button>

            </> : <></>
          }
        </div>
      </form>

      {
        loading ? (
          <Rings width={20} height={20} color="#fff" radius="6" />
        ) : (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tempo estimado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Notas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippings && shippings.length > 0 ? (
                    shippings.map((shipping, index) => (
                      <tr key={shipping.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {shipping.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {shipping.time_to_delivery}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {shipping.price}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-gray-300">
                          <div className="max-w-xs overflow-hidden overflow-ellipsis ">{shipping.additional_notes}</div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${shipping.is_active ? 'bg-green-600 text-white' : 'bg-rose-600 text-white'}`}>
                          {shipping.is_active ? "Activo" : "Inactivo"}
                        </td>

                        <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <button onClick={() => handleOpenModal(shipping.id)} className="mr-2 text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                          <button onClick={() => handleEditModal(shipping)} className="mr-2 text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                          <button onClick={() => handleToggleActive(shipping.id)} className="text-green-600 dark:text-green-500 hover:underline">{shipping.is_active ? 'Desactivar' : 'Activar'}</button>
                        </td>
                      </tr>

                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No hay métodos de envío en tu tienda</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </>)
      }
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                      <TrashIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        ¿Estas seguro de eliminar?
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 sm:text-sm"
                      onClick={() => handleDelete(shippingIdToDelete)}
                    >
                      Si, eliminar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

const mapStateToProps = state => ({
  shippings: state.Shippings_store.shippings,
  loading: state.Shippings_store.loading_shippings
})

export default connect(mapStateToProps, {
  get_shippings,
  create_shippings,
  delete_shipping,
  change_status_shipping,
  update_shipping
})(FormShippings)
