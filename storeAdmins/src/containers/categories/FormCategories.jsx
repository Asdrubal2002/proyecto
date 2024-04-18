import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { create_category, delete_category, get_categories, change_status_category, update_category } from '../../redux/actions/categories_product/categories_product';
import { Rings } from 'react-loader-spinner';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { CheckIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Create from '../store/Create';



function FormCategories({
    get_categories,
    categories,
    loading,
    create_category,
    delete_category,
    change_status_category,
    update_category

}) {

    const [formData, setFormData] = useState({
        name: '',
        parent: null
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false)
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [messageEdit, setMessageEdit] = useState(false);

    useEffect(() => {
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

        // Verificar si se está creando una nueva categoría o editando una existente
        if (editingCategoryId) {
            // Llamar a la función para editar la categoría
            update_category(editingCategoryId, formData.name, slug, formData.parent);
        } else {
            // Llamar a la función para crear una nueva categoría
            create_category(formData.name, slug, formData.parent)
        }

        // Aquí puedes agregar lógica adicional después de enviar el formulario si es necesario
    };

    const handleDelete = async (categoryId) => {
        await delete_category(categoryId)
        setOpen(false);
    }

    const handleToggleActive = async (categoryId) => {
        console.log(categoryId)
        await change_status_category(categoryId)
    }

    const handleOpenModal = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setOpen(true);
    };

    // Función para establecer los valores predefinidos
    const handleEditModal = (category) => {
        // Establecer los valores predefinidos en el estado formData
        setFormData({
            name: category.name, // Nombre predefinido
            parent: category.parent ? category.parent.id : '', // Categoría padre predefinida, si existe
        });

        setEditingCategoryId(category.id);
        setMessageEdit(true)
    };



    return (
        <>
            <form onSubmit={onSubmit} className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='¿Que nombre le vas a poner a tu categoria?'
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
                        value={formData.parent || ''}
                        onChange={handleChange}
                    >
                        <option value="">Categoría Principal</option>
                        {categories && categories
                            .filter(category => !category.parent)
                            .map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                    </select>
                </div>
                <div className='flex'>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-azul_corp hover:bg-iazul_corp_ho focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Gurdar Categoria
                    </button>
                    <p className='text-center text-red-600 py-2 p-4'>
                        {messageEdit ?  <PencilSquareIcon className="mr-2" width={20} height={20} color="#DA0000" radius="6" /> : <></>}
                    </p>
                </div>

            </form>
            {
                loading ? (
                    <Rings width={20} height={20} color="#fff" radius="6" />
                ) : (
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
                                {categories && categories.map((category, index) => (
                                    <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">{index + 1}</td> {/* Aquí se muestra la numeración */}
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
                                            <button onClick={() => handleOpenModal(category.id)} className="mr-2 text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                                            <button onClick={() => handleEditModal(category)} className="mr-2 text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                                            <button onClick={() => handleToggleActive(category.id)} className="text-green-600 dark:text-green-500 hover:underline">{category.is_active ? 'Desactivar' : 'Activar'}</button>
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
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <TrashIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                ¿Estas seguro?, se eliminaran los productos que tengas en esa categoria
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
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                            onClick={() => handleDelete(categoryIdToDelete)}
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


        </>
    )
}

const mapStateToProps = state => ({
    categories: state.Product_category.categories,
    loading: state.Product_category.loading_category_product,

})

export default connect(mapStateToProps, {
    get_categories,
    create_category,
    delete_category,
    change_status_category,
    update_category
})(FormCategories)
