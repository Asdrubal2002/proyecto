import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import { get_shippings } from '../../redux/actions/shipping/shippings';
import { Rings } from 'react-loader-spinner';


function FormShippings({
  get_shippings,
  loading,
  shippings
}) {

  useEffect(() => {
    get_shippings()
  }, []);

  return (
    <div>
      hola como
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
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippings && shippings.map((shipping, index) => (
                    <tr key={shipping.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">{index + 1}</td> {/* Aquí se muestra la numeración */}
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {shipping.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {shipping.time_to_delivery}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {shipping.price}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {shipping.additional_notes}
                      </td>
                      <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button onClick={() => handleOpenModal(shipping.id)} className="mr-2 text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                        <button onClick={() => handleEdit(shipping.id)} className="mr-2 text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                        <button onClick={() => handleToggleActive(shipping.id)} className="text-green-600 dark:text-green-500 hover:underline">{shipping.is_active ? 'Desactivar' : 'Activar'}</button>
                      </td>
                    </tr>
                  ))}
                  {!shippings && (
                    <tr>
                      <td colSpan="5">No hay categorias en tu tienda</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>)
      }
    </div>
  )
}

const mapStateToProps = state => ({
  shippings: state.Shippings_store.shippings,
  loading: state.Shippings_store.loading_shippings

})

export default connect(mapStateToProps, {
  get_shippings
})(FormShippings)
