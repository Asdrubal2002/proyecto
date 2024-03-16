import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { create_category, get_categories } from '../../redux/actions/categories_product/categories_product';
import { Rings } from 'react-loader-spinner';



function Categories({
  get_categories,
  categories,
  loading,
  create_category

}) {

  const [formData, setFormData] = useState({
    name: '',
    parent: null
  });

  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0)
    get_categories()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar el nombre: no debe contener símbolos ni números
    if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrorMessage('El nombre solo puede contener letras y espacios.');
    } else {
      setErrorMessage('');
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();



    // Verificar si el campo de nombre está vacío
    if (!formData.name.trim()) {
      setErrorMessage('El campo de nombre no puede estar vacío');
      return;
    }

    // Crear el slug a partir del nombre
    const slug = formData.name.trim().toLowerCase().replace(/\s+/g, '-');
    create_category(formData.name, slug, formData.parent)
    // Aquí puedes agregar lógica adicional después de enviar el formulario si es necesario
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.name}
            onChange={handleChange}

          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="parent" className="block text-sm font-medium text-gray-300">Categoría Padre:</label>
          <select
            name="parent"
            id="parent"
            className="mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.parent}
            onChange={handleChange}
          >
            <option value="">Principal</option>

            {categories && categories
              .filter(category => !category.parent) // Filtra solo las categorías sin parent
              .map(category => (

                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-azul_corp hover:bg-iazul_corp_ho focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear nueva categoria
        </button>
      </form>

      {
        loading ? (
          <Rings width={20} height={20} color="#fff" radius="6" />
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Activa
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categoría
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories && categories.map((category) => (
                  <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id={`checkbox-table-search-${category.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor={`checkbox-table-search-${category.id}`} className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {category.is_active ? "Activa" : "Inactiva"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {category.parent?.name || 'Principal'}
                    </td>
                    <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <button onClick={() => handleDelete(category.id)} className="mr-2 text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                      <button onClick={() => handleEdit(category.id)} className="mr-2 text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                      <button onClick={() => handleToggleActive(category.id)} className="text-green-600 dark:text-green-500 hover:underline">{category.active ? 'Desactivar' : 'Activar'}</button>
                    </td>
                  </tr>
                ))}
                {!categories && (
                  <tr>
                    <td colSpan="5">No hay categorias en tu tienda</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      }










    </Layout>

  )
}

const mapStateToProps = state => ({
  categories: state.Product_category.categories,
  loading: state.Product_category.loading_category_product
})

export default connect(mapStateToProps, {
  get_categories,
  create_category
})(Categories)
