import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { Navigate, useParams, useNavigate } from 'react-router-dom';

import { get_product } from '../../redux/actions/products/products';
import { Rings } from 'react-loader-spinner';
import { CheckIcon, PaperClipIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from "axios"
import { Dialog, Transition } from '@headlessui/react'


function EditProduct({
    get_product,
    loading_product,
    product,
    categories
}) {


    const [loading, setLoading] = useState(false)

    const params = useParams()
    const slug = params.slug

    useEffect(() => {
        window.scrollTo(0, 0)
        get_product(slug)
    }, []);


    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const [updateName, setUpdateName] = useState(false)
    const [updateCategory, setUpdateCategory] = useState(false)
    const [updateDescription, setUpdateDescription] = useState(false)
    const [updatePrice, setUpdatePrce] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState('');
    // Función para manejar el cambio de categoría seleccionada
    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };

    const navigate = useNavigate()



    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: ''
    })

    const {
        name,
        description,
        category,
        price
    } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const resetStates = () => {
        setUpdateName(false)
        setUpdateDescription(false)
        setUpdateCategory(false)
        setUpdatePrce(false)
    }



    const onSubmit = e => {
        e.preventDefault()

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('name', name)
        formData.append('slug', slug)
        formData.append('description', description)
        formData.append('category', selectedCategory)
        formData.append('price', price)



        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/edit-product/`,
                    formData,
                    config)

                if (res.status === 200) {
                    setLoading(false)
                    resetStates()
                    get_product(slug)
                } else {
                    setLoading(false)
                    resetStates()
                }
            } catch (err) {
                setLoading(false)
                resetStates()
                alert('Error al enviar', err)
            }
        }
        fetchData()
    }


    const onSubmitStatus = e => {
        e.preventDefault()

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('slug', slug)

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/edit-product-status/`,
                    formData,
                    config)

                if (res.status === 200) {
                    setLoading(false)
                    setOpen(false)
                    get_product(slug)

                } else {
                    setLoading(false)
                    setOpen(false)
                }
            } catch (err) {
                setLoading(false)
                setOpen(false)
                alert('Error al enviar', err)
            }
        }
        fetchData()


    }

    const onSubmitDelete = e => {
        e.preventDefault()
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        const formData = new FormData()
        formData.append('slug', slug)
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/delete/${slug}`,
                    formData,
                    config)

                if (res.status === 200) {
                    setLoading(false)
                    setOpenDelete(false)
                    navigate(-1)
                } else {
                    setLoading(false)
                    setOpenDelete(false)
                }
            } catch (err) {
                setLoading(false)
                setOpenDelete(false)
                alert('Error al enviar', err)
            }
        }
        fetchData()
    }

    const handleImageSelect = (id) => {
        // Aquí puedes utilizar el id de la imagen seleccionada como desees
        console.log('Imagen seleccionada:', id);

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('id', id)

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/delete-photo/${id}`,
                    formData,
                    config)

                if (res.status === 200) {
                    setLoading(false)
                    get_product(slug)
                } else {
                    setLoading(false)
                    get_product(slug)
                }
            } catch (err) {
                setLoading(false)
                get_product(slug)
                alert('Error al enviar', err)
            }
        }
        fetchData()



    };


    return (
        <Layout>
            {loading_product ? <Rings width={30} height={30} color="#fff" radius="6" />
                :
                <>
                    <div className=" px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <h3 className="text-3xl font-medium leading-6 text-gray-300">
                                    {product && product.name}  - {product && product.category.name}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-200">
                                    {product && product.is_active ? <>Activad@</> : <>Desactivad@</>}
                                </p>
                            </div>

                            <div className="ml-4 mt-4 flex-shrink-0">
                                <button
                                    onClick={e => setOpenDelete(true)}
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                >
                                    Elimiar Producto
                                </button>
                                <a
                                    href={`${import.meta.env.VITE_REACT_APP_API_URL}/${product && product.slugProduct}/detail`}
                                    target="_blank"
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Ver producto
                                </a>
                                <button
                                    onClick={e => setOpen(true)}
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    {
                                        product && product.is_active ?
                                            <>Desactivar Producto</> : <>Publicarlo en mi tienda</>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <>
                        {/* <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-300">Información de tu producto 2:28:30</h3>
                        </div> */}
                        <div className="mt-5 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Nobre del producto</dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updateName ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <input
                                                        value={name}
                                                        onChange={e => onChange(e)}
                                                        name='name'
                                                        type='text'
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                    />
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <div
                                                            onClick={() => setUpdateName(false)}
                                                            className="cursor-pointer text-azul_corp font-medium hover:text-indigo-500"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </div>
                                                    </div>
                                                </form>

                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.name}</span>
                                                <button
                                                    onClick={() => setUpdateName(true)}
                                                    className="px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />

                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Categoria de tu producto</dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updateCategory ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <select
                                                        value={selectedCategory}
                                                        onChange={handleCategoryChange}
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                    >
                                                        <option value="">Seleccione una categoría...</option>
                                                        {categories.map(category => (
                                                            <React.Fragment key={category.id}>
                                                                {category.parent ? (
                                                                    // Categoría hijo
                                                                    <option value={category.id}>{category.name}</option>
                                                                ) : (
                                                                    // Categoría padre
                                                                    <optgroup label={category.name}>
                                                                        {categories.filter(childCategory => childCategory.parent === category.id).map(childCategory => (
                                                                            <option key={childCategory.id} value={childCategory.id}>{childCategory.name}</option>
                                                                        ))}
                                                                    </optgroup>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </select>

                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <div
                                                            onClick={() => setUpdateCategory(false)}
                                                            className="cursor-pointer text-azul_corp font-medium hover:text-indigo-500"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </div>
                                                    </div>
                                                </form>

                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.category.name}</span>
                                                <button
                                                    onClick={() => setUpdateCategory(true)}
                                                    className="px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />

                                                </button>
                                            </>
                                        )}
                                    </dd>

                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Descripción</dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updateDescription ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <textarea
                                                        value={description}
                                                        onChange={e => onChange(e)}
                                                        name='description'
                                                        type='text'
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                    />
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <div
                                                            onClick={() => setUpdateDescription(false)}
                                                            className="cursor-pointer text-azul_corp font-medium hover:text-indigo-500"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </div>
                                                    </div>
                                                </form>

                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.description}</span>
                                                <button
                                                    onClick={() => setUpdateDescription(true)}
                                                    className="ml-2 px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />
                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Precio</dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updatePrice ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <input
                                                        value={price}
                                                        onChange={e => onChange(e)}
                                                        name='price'
                                                        type='text'
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                    />
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <div
                                                            onClick={() => setUpdatePrce(false)}
                                                            className="cursor-pointer text-azul_corp font-medium hover:text-indigo-500"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </div>
                                                    </div>
                                                </form>

                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.price}</span>
                                                <button
                                                    onClick={() => setUpdatePrce(true)}
                                                    className="px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />

                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Attachments</dt>
                                    <dd className="mt-1 text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                                </div>
                                                <div className="ml-4 flex flex-shrink-0 space-x-4">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-azul_corp hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Update
                                                    </button>
                                                    <span className="text-gray-300" aria-hidden="true">
                                                        |
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-azul_corp hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                                </div>
                                                <div className="ml-4 flex flex-shrink-0 space-x-4">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-azul_corp hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Update
                                                    </button>
                                                    <span className="text-gray-300" aria-hidden="true">
                                                        |
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-azul_corp hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div> */}
                            </dl>
                        </div>
                    </>

                    {
                        product.images.length > 0 ? <>
                            <div className="grid grid-cols-3 gap-4">
                                {product.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            className="w-full h-auto object-cover rounded-md shadow-md"
                                            src={import.meta.env.VITE_REACT_APP_API_URL + image.photo}
                                            alt={image.alt}
                                        />
                                        <button
                                            className="absolute top-2 right-2 bg-gray-800 text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out"
                                            onClick={() => handleImageSelect(image.id)}
                                        >
                                            <TrashIcon width={20} height={20} color="#fff" radius="6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </> : <>
                            <div className="bg-gray-800 text-gray-200 rounded-md p-4">
                                <p className="text-center text-gray-300 mb-2">El producto no tiene imagenes</p>
                                <p className="text-center text-gray-300 mb-4">Agrega para mostrarlo al publico</p>
                            </div>
                        </>
                    }





                </>}


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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            {
                                                product && product.is_active ?
                                                    <XMarkIcon className="h-6 w-6 text-azul_corp_ho" aria-hidden="true" />
                                                    :
                                                    <CheckIcon className="h-6 w-6 text-azul_corp_ho" aria-hidden="true" />

                                            }
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                {
                                                    product && product.is_active ?
                                                        <>¿Quieres desactivar el producto de tu tienda?</> : <>¿Quieres publicarlo en tu tienda?</>

                                                }
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {
                                                    product && product.name && product.description && product.price ?
                                                        <></>
                                                        :
                                                        <p className="text-sm text-gray-500">
                                                            To publish this post you must add: Title, Description, Slug and Content
                                                        </p>


                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        (product && product.name && product.description && product.price) &&
                                        <>
                                            {
                                                product && product.is_active ?
                                                    <form onSubmit={e => onSubmitStatus(e)} className="mt-5 sm:mt-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"

                                                        >
                                                            <span>Si, Desactivar</span>
                                                        </button>
                                                        :
                                                        <></>
                                                    </form>
                                                    :
                                                    <form onSubmit={e => onSubmitStatus(e)} className="mt-5 sm:mt-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"

                                                        >
                                                            <span>Si, Activar</span>
                                                        </button>
                                                        :
                                                        <></>
                                                    </form>
                                            }
                                        </>
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            <Transition.Root show={openDelete} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenDelete}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                <span>Eliminar producto</span>
                                            </Dialog.Title>
                                            <div className="mt-2">

                                                <p className="text-sm text-gray-500">
                                                    ¿Quieres eliminar el producto?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={e => onSubmitDelete(e)} className="mt-5 sm:mt-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm"

                                        >
                                            <span>Eliminar completamente</span>
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


        </Layout>

    )
}

const mapStateToProps = state => ({
    loading_product: state.Products.loading_product,
    product: state.Products.product,
    categories: state.Product_category.categories
})

export default connect(mapStateToProps, {
    get_product
})(EditProduct)
