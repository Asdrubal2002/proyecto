import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { create_category, delete_category, get_categories, change_status_category, update_category } from '../../redux/actions/categories_product/categories_product';
import { Rings } from 'react-loader-spinner';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, InformationCircleIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Create from '../store/Create';

const steps = [
    {
        id: 1,
        step: 'Paso 1',
        title: 'Crear la categoría padre',
        description: 'Comienza nombrando una categoría principal y márcala como categoría padre. Por ejemplo, podrías usar "Tecnología".',
    },
    {
        id: 2,
        step: 'Paso 2',
        title: 'Guardar la categoría padre',
        description: 'Guarda la categoría padre que acabas de crear. Una vez guardada, aparecerá en el selector de categorías padre.',
    },
    {
        id: 3,
        step: 'Paso 3',
        title: 'Crear subcategorías',
        description: 'Ahora es el momento de crear subcategorías. Escribe el nombre de la subcategoría y selecciona a qué categoría padre pertenece. Por ejemplo, "Celulares" como subcategoría de "Tecnología".',
    },
    // More steps...
];


function FormCategories({
    get_categories,
    categories,
    loading,
    create_category,
    delete_category,
    change_status_category,
    update_category

}) {

    const initialFormData = {
        name: '',
        parent: null
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false)
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [messageEdit, setMessageEdit] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [openHelp, setOpenHelp] = useState(false)

    const [parentEnabled, setParentEnabled] = useState(true); // Estado para habilitar o deshabilitar el campo parent

    useEffect(() => {
        get_categories()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // Verificar si el campo de nombre está vacío
        if (!formData.name.trim()) {
            setErrorMessage('El campo de nombre no puede estar vacío');
            return;
        }

        // Crear el slug a partir del nombre
        const slug = formData.name
            .trim()
            .toLowerCase()
            // Eliminar tildes y otros símbolos del slug
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, '-');

        // Verificar si se está creando una nueva categoría o editando una existente
        if (editingCategoryId) {
            // Llamar a la función para editar la categoría
            await update_category(editingCategoryId, formData.name, slug, formData.parent);
            get_categories()
            clearFormData()
            setParentEnabled(true)
        } else {
            // Llamar a la función para crear una nueva categoría
            await create_category(formData.name, slug, formData.parent)

            get_categories()

        }
        // Aquí puedes agregar lógica adicional después de enviar el formulario si es necesario
        setFormData(initialFormData)
    };


    const handleDelete = async (categoryId) => {
        await delete_category(categoryId)
        setOpen(false);
        get_categories()
    }

    const handleToggleActive = async (categoryId) => {
        await change_status_category(categoryId)
        get_categories()
    }

    const handleOpenModal = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setOpen(true);
    };

    // Función para establecer los valores predefinidos
    const handleEditModal = (category) => {
        window.scrollTo(0, 0)

        // Establecer los valores predefinidos en el estado formData
        setFormData({
            name: category.name, // Nombre predefinido
            parent: category.parent_id // Categoría padre predefinida, si existe
        });

        // Establecer la habilitación del campo parent
        setParentEnabled(!!category.parent_id);

        setEditingCategoryId(category.id);
        setMessageEdit(true);
    };

    // Función para limpiar el formulario
    const clearFormData = () => {
        setFormData(initialFormData);
        setEditingCategoryId(null)
        setMessageEdit(false)
        setParentEnabled(true)
    };

    const toggleCategory = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const [categoryFilter, setCategoryFilter] = useState('');

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const filteredCategories = categories ? categories.filter(category =>
        category.name.toLowerCase().includes(categoryFilter.toLowerCase())
    ) : [];

    return (
        <>
            <form onSubmit={onSubmit} className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
                <div className="mb-4">

                    <div className="flex items-center">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mr-2 flex-grow">Nombre:</label>
                        <div
                            onClick={e => setOpenHelp(true)}
                            className='flex text-yellow-400'>
                            <InformationCircleIcon className="w-5 h-5 " />
                            <p className='font-semibold text-sm cursor-pointer'>Necesitas ayuda</p>
                        </div>
                    </div>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='¿Que nombre le vas a poner a tu categoria? Ejemplos: Femenina, Masculino, Computadoras, Aceites, Perros, Gatos '
                        className="placeholder:text-sm mt-1 p-2 block w-full rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none"
                        value={formData.name}
                        onChange={handleChange}

                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                    )}
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mr-2">Selecciona la categoría Padre:</label>

                    </div>

                    <select
                        name="parent"
                        id="parent"
                        className="text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
                        value={formData.parent || ''}
                        onChange={handleChange}
                        disabled={!parentEnabled} // Deshabilitar el campo si parentEnabled es falso

                    >
                        <option value="">Categoría Padre</option>
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
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-l-md text-white bg-azul_corp hover:bg-azul_corp_ho"
                    >
                        {
                            messageEdit ? <> Actualizar Categoría</>:<> Guardar Categoía nueva</>
                        }
                    </button>
                    {
                        messageEdit ? <>
                            <button onClick={() => clearFormData()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-red-500 hover:bg-red-400">Cancelar la edición de mi categoría.</button>

                        </> : <></>
                    }
                </div>
            </form>
            {
                loading ? (
                    <Rings width={20} height={20} color="#fff" radius="6" />
                ) : (
                    <div className="relative overflow-x-auto shadow-md rounded-lg">
                        <div className="w-full p-4 bg-gray-50 bg-gray-800">
                            <input
                                type="text"
                                placeholder="Buscar categoría por nombre..."
                                className="block w-full p-2 bg-gray-700 bg-gray-700 rounded-md placeholder-gray-400 text-gray-200 outline-none text-sm "
                                value={categoryFilter}
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
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
                                        Estado
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
                                {filteredCategories.map((category, index) => (
                                    <React.Fragment key={category.id}>
                                        <tr
                                            key={category.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                            onClick={() => toggleCategory(category.id)}
                                        >
                                            <td className="w-4 p-4">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8">
                                                        {/* Icono o imagen */}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {category.name}
                                                            {category.sub_categories && (
                                                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    ({category.sub_categories.length})
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap ${category.is_active ? 'bg-green-600 text-white' : 'bg-rose-600 text-white'}`}>
                                                {category.is_active ? "Activa" : "Inactiva"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p>Principal</p>
                                            </td>
                                            <td className="py-4 whitespace-nowrap">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenModal(category.id);
                                                    }}
                                                    className="mr-2 text-red-600 dark:text-red-500 hover:underline font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditModal(category);
                                                    }}
                                                    className="mr-2 text-blue-600 dark:text-blue-500 hover:underline font-medium"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleActive(category.id);
                                                    }}
                                                    className="text-green-600 dark:text-green-500 hover:underline font-medium"
                                                >
                                                    {category.is_active ? 'Desactivar' : 'Activar'}
                                                </button>

                                                {category.sub_categories && category.sub_categories.length > 0 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCategory(category.id);
                                                        }}
                                                        className="ml-2 text-gray-600 dark:text-gray-400 hover:underline"
                                                    >
                                                        {expandedCategories.includes(category.id) ? (
                                                            <ArrowUpIcon className="" width={18} height={18} color="#fff" radius="6" />
                                                        ) : (
                                                            <ArrowDownIcon className="" width={18} height={18} color="#fff" radius="6" />
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>

                                        {category.sub_categories && expandedCategories.includes(category.id) && category.sub_categories.map(subCategory => (
                                            <tr key={subCategory.id} className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="w-4 p-4"></td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8">
                                                            {/* Icono o imagen */}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{subCategory.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap ${subCategory.is_active ? 'bg-green-600 text-white' : 'bg-rose-600 text-white'}`}>
                                                    {subCategory.is_active ? "Activa" : "Inactiva"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {category.name} {/* Aquí se muestra el nombre de la categoría padre */}
                                                </td>
                                                <td className="py-4 whitespace-nowrap">
                                                    <button onClick={() => handleOpenModal(subCategory.id)} className="mr-2 text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                                                    <button onClick={() => handleEditModal(subCategory)} className="mr-2 text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                                                    <button onClick={() => handleToggleActive(subCategory.id)} className="text-green-600 dark:text-green-500 hover:underline">{subCategory.is_active ? 'Desactivar' : 'Activar'}</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                                {!categories && (
                                    <tr>
                                        <td colSpan="5">No hay categorías en tu tienda</td>
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
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                                            <TrashIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
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
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 sm:text-sm"
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

            <Transition.Root show={openHelp} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenHelp}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-stone-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                    <div className="py-6 sm:py-6">
                                        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-gray-200">
                                            <div className="mx-auto max-w-2xl lg:mx-0">
                                                <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">¿Como crear categorías?</h2>
                                            </div>
                                            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 pt-6 sm:mt-2 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                                {steps.map((post) => (
                                                    <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                                        <div className="flex items-center text-xs">
                                                            <div
                                                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                                            >
                                                                {post.step}
                                                            </div>
                                                        </div>
                                                        <div className="group relative">
                                                            <h3 className="mt-3 text-lg font-semibold leading-6  ">
                                                                <a href={post.href}>
                                                                    <span className="absolute inset-0" />
                                                                    {post.title}
                                                                </a>
                                                            </h3>
                                                            <p className="mt-5 text-sm leading-6 ">{post.description}</p>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                            <div className='mt-6'>
                                                <div className="mx-auto max-w-2xl lg:mx-0">
                                                    Ahora puedes <Link to="/products" className="text-blue-600 hover:underline font-bold">añadir productos</Link> a las categorías que has creado.
                                                </div>
                                            </div>
                                        </div>
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
