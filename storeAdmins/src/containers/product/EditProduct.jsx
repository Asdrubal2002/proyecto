import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom';

import { get_options_admin, get_product, get_products_options } from '../../redux/actions/products/products';
import { Rings } from 'react-loader-spinner';
import { BarsArrowUpIcon, CheckCircleIcon, CheckIcon, ChevronUpIcon, InformationCircleIcon, PaperClipIcon, PencilIcon, PhotoIcon, PlusIcon, TrashIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from "axios"
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { get_categories } from '../../redux/actions/categories_product/categories_product';
import FormCategories from '../categories/FormCategories';
import DOMPurify from 'dompurify'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import OptionDataInput from './OptionDataInput';
import Compressor from 'compressorjs';



function EditProduct({
    get_product,
    loading_product,
    product,
    get_categories,
    categories,
    get_products_options,
    options,
    get_options_admin,
    all_options
}) {
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const slug = params.slug

    useEffect(() => {
        get_product(slug)
        get_categories()
        get_products_options(slug)
        get_options_admin()
    }, []);

    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const [updateName, setUpdateName] = useState(false)
    const [updateCategory, setUpdateCategory] = useState(false)
    const [updateDescription, setUpdateDescription] = useState(false)
    const [updatePrice, setUpdatePrice] = useState(false)

    const [updatePhoto, setUpdatePhoto] = useState(false)
    const [previewImage, setPreviewImage] = useState()
    const [photo, setPhoto] = useState(null)

    const [updateOptions, setUpdateOptions] = useState(false)

    const [openAddCategory, setOpenAddCategory] = useState(false)

    const [suggestions, setSuggestions] = useState([]);


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
        price: '',
        optionPr: '',
        quantity: ''

    })

    const {
        name,
        description,
        category,
        price,
        optionPr,
        quantity
    } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const resetStates = () => {
        setUpdateName(false)
        setUpdateDescription(false)
        setUpdateCategory(false)
        setUpdatePrice(false)
        setUpdatePhoto(false)
        setUpdateOptions(false)
    }

    const onSubmit = e => {
        e.preventDefault()

        const config = {
            headers: {
                'Accept': 'application/json',
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

    const fileSelectedHandler = (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setPreviewImage(reader.result);
        };
        setPhoto(file)
    }

    const onSubmitPhotos = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const compressedImage = await compressImage(photo); // Comprimir la imagen

        const formData = new FormData();
        formData.append('slug', slug);
        formData.append('photo', compressedImage, compressedImage.name);

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/edit-product-photo/`,
                    formData,
                    config
                );

                if (res.status === 200) {
                    setLoading(false);
                    resetStates();
                    setPreviewImage(null);
                    setPhoto(null);
                    get_product(slug);
                } else {
                    setLoading(false);
                    resetStates();
                }
            } catch (err) {
                setLoading(false);
                resetStates();
                alert('Error al enviar', err);
            }
        };
        fetchData();
        window.scrollTo(0, 900);
    };

    // Función para comprimir la imagen
    const compressImage = async image => {
        return new Promise((resolve, reject) => {
            new Compressor(image, {
                quality: 0.6, // Calidad de compresión (0 a 1)
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Eliminar puntos y comas del valor del precio
        const cleanedValue = value.replace(/[^\d]/g, '');

        setFormData({
            ...formData,
            [name]: cleanedValue
        });
    };

   

    const handleDeleteOption = (optionId) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/delete-option/${optionId}`,
                    config)

                if (res.status === 204) {
                    setLoading(false)
                    get_products_options(slug)
                } else {
                    setLoading(false)
                }
            } catch (err) {
                setLoading(false)
            }
        }
        fetchData()
    };

    return (
        <Layout>
            {loading_product ? <Rings width={30} height={30} color="#fff" radius="6" />
                :
                <>
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="mt-4 sm:w-full md:w-auto">
                                <h3 className="text-3xl font-medium leading-6 text-gray-300">
                                    {product && product.name} - {product && product.category.name}
                                </h3>
                                <p className="mt-1 flex items-center text-sm text-gray-500">
                                    {product && product.is_active ? (
                                        <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                                    ) : (
                                        <XCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
                                    )}
                                    {product && product.is_active ? 'Activo' : 'Inactivo'}
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-4 flex-shrink-0 flex flex-wrap">
                                <button
                                    onClick={e => setOpenDelete(true)}
                                    className="relative m-1 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700"
                                >
                                    Elimiar Producto
                                </button>
                                <a
                                    href={`${import.meta.env.VITE_REACT_APP_API_URL}/${product && product.slugProduct}/detail`}
                                    target="_blank"
                                    className="relative m-1 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
                                >
                                    Ver producto
                                </a>
                                <button
                                    onClick={e => setOpen(true)}
                                    className="relative m-1 inline-flex items-center rounded-md border border-transparent bg-azul_corp_ho px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp"
                                >
                                    {product && product.is_active ? <>Desactivar Producto</> : <>Publicarlo en mi tienda</>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <>
                        <div className="mt-5 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Nombre del producto</dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updateName ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <input
                                                        value={name}
                                                        onChange={e => onChange(e)}
                                                        name='name'
                                                        type='text'
                                                        maxLength={100} // Máximo de 50 caracteres permitidos
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                        placeholder='Nuevo nombre'
                                                    />
                                                    {/* Mensaje de error si el campo de nombre está vacío */}
                                                    {name === '' && (
                                                        <span className="text-red-500 text-sm mt-1 ml-4">El nombre es obligatorio</span>
                                                    )}
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            disabled={name === ''} // Deshabilitar el botón si el nombre está vacío
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <button
                                                            onClick={() => setUpdateName(false)}
                                                            className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                    </div>
                                                </form>



                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.name}</span>
                                                <button
                                                    onClick={() => setUpdateName(true)}
                                                    className="px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none  "
                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />

                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>
                                {/* Categoria */}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Categoria de tu producto</dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updateCategory ? (
                                            <>

                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <select
                                                        name='category'
                                                        value={selectedCategory}
                                                        onChange={handleCategoryChange}
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                    >
                                                        <option value="">Seleccione una categoría...</option>
                                                        {categories && categories.map(category => (
                                                            <optgroup key={category.id} label={category.name}>
                                                                {category.sub_categories && category.sub_categories.length > 0 && (
                                                                    // Agregar las subcategorías dentro del optgroup
                                                                    category.sub_categories.map(subCategory => (
                                                                        <option key={subCategory.id} value={subCategory.id}>
                                                                            {subCategory.name}</option>
                                                                    ))
                                                                )}
                                                            </optgroup>
                                                        ))}
                                                    </select>
                                                    {/* Mensaje de error si no se ha seleccionado ninguna categoría */}
                                                    {selectedCategory === '' && (
                                                        <span className="text-red-500 text-sm mt-1 ml-4">Seleccione una categoría</span>
                                                    )}
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            disabled={selectedCategory === ''}
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <button
                                                            onClick={() => setOpenAddCategory(true)}
                                                            className="px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700  focus:outline-none"
                                                        >
                                                            <BarsArrowUpIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <button
                                                            onClick={() => setUpdateCategory(false)}
                                                            className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.category.name}</span>
                                                <button
                                                    onClick={() => setUpdateCategory(true)}
                                                    className="px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none  "                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />

                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                {/* description */}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">Descripción</dt>
                                    <dd className="mt-1 flex text-sm text-gray-800 sm:col-span-2 sm:mt-0">
                                        {updateDescription ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <div className='mt-1 p-2 rounded-md w-full focus:outline-none text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900'>
                                                        <CKEditor editor={ClassicEditor}
                                                            className=""
                                                            data={description}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                onChange({ target: { name: 'description', value: data } });
                                                            }}
                                                            config={{
                                                                toolbar: {
                                                                    items: [
                                                                        'bold', 'italic', 'underline', '|', // Negrita, cursiva, subrayad
                                                                    ]
                                                                },

                                                            }}
                                                        />
                                                    </div>

                                                    {/* <textarea 
                                                        value={description}
                                                        onChange={e => onChange(e)}
                                                        name='description'
                                                        maxLength={400} // Máximo de 400 caracteres permitidos
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        required
                                                        placeholder='Nueva descripción'
                                                    />  */}
                                                    {/* Mensaje de error si el campo de descripción está vacío */}
                                                    {/* {description === '' && (
                                                        <span className="text-red-500 text-sm mt-1 ml-4">La descripción es obligatoria</span>
                                                    )} */}
                                                    {description.length > 5000 && (
                                                        <span className="text-red-500 text-sm mt-1 ml-4">La descripción excede 5000 caracteres</span>
                                                    )}
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            disabled={description.length > 5000} // Deshabilitar el botón si la descripción está vacía o excede los 400 caracteres
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <button
                                                            onClick={() => setUpdateDescription(false)}
                                                            className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                    </div>
                                                </form>


                                            </>
                                        ) : (
                                            <>

                                                <span className="flex-grow text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product && product.description) }} />
                                                <button
                                                    onClick={() => setUpdateDescription(true)}
                                                    className="ml-2 px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none  "
                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />
                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                {/* Precio */}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-200">


                                        <Disclosure>
                                            <Disclosure.Button className="focus:outline-none">
                                                <p className='flex'>
                                                    Precio  <InformationCircleIcon className="w-6 h-6 text-gray-400 mx-2" />
                                                </p>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel className=" rounded-md p-2 text-yellow-400 text-sm">
                                                    <p>
                                                        En Ruvlo, puedes escribir los precios de dos maneras diferentes: con o sin puntos. Por ejemplo, puedes poner <strong>"34.000"</strong> o simplemente <strong>"34000"</strong>. Es mejor mantener una forma consistente de escribir los precios tanto para los productos como para los métodos de pago.
                                                    </p>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </Disclosure>


                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-300 sm:col-span-2 sm:mt-0">
                                        {updatePrice ? (
                                            <>
                                                <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    <input
                                                        value={price}
                                                        onChange={e => {
                                                            const { value } = e.target;
                                                            // Mantener solo los números
                                                            const cleanedValue = value.replace(/[^\d]/g, ''); // Eliminar todo excepto los números
                                                            onChange({ target: { name: 'price', value: cleanedValue } }); // Llamar a la función onChange con el valor limpio
                                                        }}
                                                        name='price'
                                                        type='text'
                                                        maxLength={10} // Máximo de 10 caracteres para un valor monetario (por ejemplo, 999,999.99)
                                                        className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                                        placeholder='Nuevo precio'
                                                    />


                                                    {/* Mensaje de error si el campo de precio está vacío */}
                                                    {price === '' && (
                                                        <span className="text-red-500 text-sm mt-1 ml-4">El precio es obligatorio</span>
                                                    )}
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            disabled={price === '' || price.length > 10} // Deshabilitar el botón si el precio está vacío, no es un valor monetario válido o excede el límite
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none"
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <button
                                                            onClick={() => setUpdatePrice(false)}
                                                            className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none"
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow">{product && product.price}</span>
                                                <button
                                                    onClick={() => setUpdatePrice(true)}
                                                    className="px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-800 focus:outline-none  "                                                >
                                                    <PencilIcon width={20} height={20} color="#fff" radius="6" />

                                                </button>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                {/* Optiones */}



                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <div className="mt-4 flex text-sm text-gray-300 sm:col-span-3 sm:mt-0">
                                        <span className="flex-grow">
                                            <OptionDataInput all_options={all_options} product={product} resetStates={resetStates} slug={slug} get_products_options={get_products_options} />

                                            <table className="min-w-full divide-y divide-gray-700 rounded-md">
                                                <thead className="bg-gray-800">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre de la Opción</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cantidad</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-gray-900 divide-y divide-gray-700">
                                                    {options && options.length === 0 ? (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-normal" colSpan="4">
                                                                <div className="text-sm text-gray-300">
                                                                    <p>
                                                                        Puedes registrar las distintas opciones disponibles y su cantidad para el producto. Por ejemplo, colores, tallas, sabores, ingredientes, etc.
                                                                    </p>
                                                                    <p className='text-red-500'>
                                                                        <strong>
                                                                            No puedes dejar este campo vacío. Si no tienes opciones, complétalo con una característica principal de tu producto y la cantidad que tengas disponible.
                                                                        </strong>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    ) : (
                                                        options && options.map((option, index) => (
                                                            <tr key={index}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.option.value}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.quantity} Unidades</td>
                                                                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${option.is_active ? 'bg-green-600 text-white' : 'bg-rose-600 text-white'}`}>{option.is_active ? "Activo" : "Inactivo"}</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button className="ml-2 focus:outline-none">
                                                                        <TrashIcon width={20} height={20} color="#fff" radius="6" onClick={() => handleDeleteOption(option.id)} />
                                                                    </button>
                                                                    <button className="ml-2 focus:outline-none">
                                                                        <PencilIcon width={20} height={20} color="#fff" radius="6" onClick={() => handleEditOption(option.id)} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>

                                        </span>
                                    </div>

                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <div className="mt-4 flex text-sm text-gray-300 sm:col-span-3 sm:mt-0">
                                        {updatePhoto ? (
                                            <>
                                                {previewImage && (
                                                    <img src={previewImage} className="object-cover w-80 h-72 p-4" alt="Preview" />
                                                )}
                                                <form onSubmit={onSubmitPhotos} className="flex w-full items-center">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        onChange={fileSelectedHandler}
                                                        className="w-full py-3 px-2 border border-gray-300 rounded-lg"
                                                        required
                                                    />
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none  "
                                                        >
                                                            <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setUpdatePhoto(false);
                                                                setPreviewImage(null);
                                                                setPhoto(null);
                                                            }}
                                                            className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none  "
                                                        >
                                                            <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setUpdatePhoto(true)}
                                                    className="flex-grow  flex items-center justify-center px-4 py-2 rounded-md bg-gray-800 text-azul_corp font-medium hover:bg-gray-700 focus:outline-none  "
                                                >
                                                    <p className='m-2 text-gray-300'>
                                                        Agrega imágenes a tu producto
                                                    </p>
                                                    <PhotoIcon width={20} height={20} color="#fff" radius="6" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </dl>
                        </div>
                        <div className="bg-stone-900 text-white p-4 rounded-md">
                            <div className='flex items-center'>
                                <h2 className="text-lg font-semibold mb-2 flex items-center flex-grow">Galería de tu producto</h2>

                                <Link to={'/help_with_photos'} className='text-gray-400 hover:text-gray-300 flex'>
                                    <InformationCircleIcon width={20} height={20} color="#fff" radius="6" />

                                    <p className='mx-2 text-sm font-medium'>Necesitas ayuda con tus fotos </p>

                                </Link>

                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {product && product.images.length > 0 ? (
                                    product.images.map((image, index) => (
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
                                    ))
                                ) : (
                                    <div className="text-gray-200 rounded-md p-4">
                                        <p className="text-center text-gray-300 mb-2">El producto no tiene imágenes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
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
                                                    product && product.name  && product.price ?
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
                                        (product && product.name  && product.price) &&
                                        <>
                                            {
                                                product && product.is_active ?
                                                    <form onSubmit={e => onSubmitStatus(e)} className="mt-5 sm:mt-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none sm:text-sm"

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
                                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none sm:text-sm"

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
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none  focus:ring-rose-500 focus:ring-offset-2 sm:text-sm"

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



            <Transition.Root show={openAddCategory
            } as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenAddCategory}>
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
                                    {/* <h2 className="text-lg font-medium leading-6 text-gray-800">crear tu producto</h2> */}

                                    <FormCategories />

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
    categories: state.Product_category.categories,
    options: state.Products.options,
    all_options: state.Products.list_admin_options,

})

export default connect(mapStateToProps, {
    get_product,
    get_products_options,
    get_categories,
    get_options_admin
})(EditProduct)
