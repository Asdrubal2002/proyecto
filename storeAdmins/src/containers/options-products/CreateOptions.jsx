import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { get_options_admin } from '../../redux/actions/products/products';
import { Rings } from 'react-loader-spinner';
import { CheckIcon, GlobeAltIcon, InformationCircleIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from "axios"
import { Link } from 'react-router-dom';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'



function CreateOptions({
    options,
    loading_options,
    get_options_admin
}) {
    const [loading, setLoading] = useState(false);
    const [editingOptionId, setEditingOptiongId] = useState(null);

    useEffect(() => {
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const maxChars = 150;
    const initialFormData = {
        valueOption: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [messageEdit, setMessageEdit] = useState(false);
    const [openHelp, setOpenHelp] = useState(false)

    const handleDeleteOption = (option) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/option-delete/${option.id}`, config);
                if (res.status === 204) {
                    setLoading(false);
                    get_options_admin();
                    setMessage(
                        <div>
                            <p className='m-4 bg-green-600 p-4 rounded-lg'>Se ha eliminado exitosamente esta opción: <strong> {option.value}</strong></p>

                        </div>
                    )
                } else if (res.status === 200 && res.data.related_products) {
                    // Si hay productos relacionados, puedes acceder a ellos aquí
                    const relatedProducts = res.data.related_products;

                    // Mostrar los productos relacionados en una lista
                    const productList = relatedProducts.map((product, index) => (
                        <li key={product.id} >
                            <span>{index + 1}. </span> {/* Mostrar el índice enumerado */}
                            <Link to={`/product/${product.product.slugProduct}`} className='hover:text-azul_corp_ho'>{product.product.name} - {product.product.formatted_price}</Link>
                        </li>
                    ));
                    // Establecer el mensaje con la lista de productos
                    setMessage(
                        <div>
                            <span className='m-4 bg-red-700 p-4 rounded-lg font-semibold block'>
                                No se puede eliminar esta opción <strong>{option.value}</strong> porque está asociada a los siguientes productos:
                            </span>
                            <ul className='m-4 font-semibold'>
                                {productList}
                            </ul>
                        </div>
                    );

                }
            } catch (err) {
                // Manejar errores aquí
                setLoading(false);
                console.error('Error al eliminar la opción:', err);
            }
        };

        fetchData();
        window.scrollTo(0, 0);


    };

    const onSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        if (!formData.valueOption.trim()) {
            setError(`El campo de nombre de opción no puede estar vacío`);
            return;
        }

        if (formData.valueOption.length > maxChars) {
            setError(`El nombre de la opción no puede exceder los ${maxChars} caracteres.`);
            return;
        }


        if (editingOptionId) {
            const formDataToSendEdit = new FormData();
            formDataToSendEdit.append('id', editingOptionId);
            formDataToSendEdit.append('value', formData.valueOption);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/options/update/`,
                        formDataToSendEdit,
                        config);

                    if (res.status === 200) {
                        setLoading(false);
                        get_options_admin();
                    } else {
                        setLoading(false);
                    }
                } catch (err) {
                    setLoading(false);
                }
            };
            fetchData();
            clearFormData()

        } else {
            const formDataToSend = new FormData();
            formDataToSend.append('value', formData.valueOption);
            console.log(formDataToSend);


            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/product/create-options-admin/`,
                        formDataToSend,
                        config);

                    if (res.status === 201) {
                        setLoading(false);
                        get_options_admin();
                    } else {
                        setLoading(false);
                    }
                } catch (err) {
                    setLoading(false);
                }
            };
            fetchData();
            clearFormData()

        }
    };

    const handleEditOption = (option) => {
        setMessage('')

        window.scrollTo(0, 0);
        setFormData({
            valueOption: option.value,
        });

        setEditingOptiongId(option.id);
        setMessageEdit(true)
        console.log(editingOptionId, formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clearFormData = () => {
        setFormData(initialFormData);
        setMessageEdit(false)
        setEditingOptiongId(null)
        setError('');
    };


    const filteredOptions = options ? options.filter(option =>
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    return (
        <>
            <form onSubmit={onSubmit} className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
                <div className="mb-4">
                <div className="flex items-center">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mr-2 flex-grow">Nombre de la opción: *</label>
                        <div
                            onClick={e => setOpenHelp(true)}
                            className='flex text-yellow-400'>
                            <InformationCircleIcon className="w-5 h-5 " />
                            <p className='font-semibold text-sm cursor-pointer'>Necesitas ayuda</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="valueOption"
                        id="valueOption"
                        placeholder="Nombre de la opción"
                        className="placeholder:text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
                        value={formData.valueOption}
                        onChange={handleChange}
                        
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>

                <div className="flex">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-l-md text-white bg-azul_corp hover:bg-azul_corp_ho"
                    >
                        {
                            messageEdit ? <> Actualizar Opción</>:<> Guardar Opción global nueva</>
                        }
                       
                    </button>
                    {
                        messageEdit ? <>
                            <button onClick={() => clearFormData()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-red-500 hover:bg-red-400">Cancelar la edición de mi opción.</button>

                        </> : <></>
                    }
                </div>
            </form>

            {message && <p>{message}</p>}

            {loading_options ? (
                <Rings width={20} height={20} color="#fff" radius="6" />
            ) : (
                <>
                    <div className="w-full p-4 bg-gray-50 bg-gray-900 rounded-t-lg">
                        <input
                            type="text"
                            placeholder="Buscar opción..."
                            className="block w-full p-2 bg-gray-700 bg-gray-700 rounded-md placeholder-gray-400 text-gray-200 outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table className="min-w-full divide-y divide-gray-700 rounded-md">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre de la Opción</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 divide-y divide-gray-700">
                            {filteredOptions.map((option, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="ml-2 focus:outline-none">
                                            <TrashIcon width={20} height={20} color="#fff" radius="6" onClick={() => handleDeleteOption(option)} />
                                        </button>
                                        <button className="ml-2 focus:outline-none">
                                            <PencilIcon width={20} height={20} color="#fff" radius="6" onClick={() => handleEditOption(option)} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
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
                                                <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">Opciones de producto</h2>
                                            </div>
                                            <div className='mt-4'>
                                            Este sistema permite a las tiendas definir opciones globales específicas (como colores o tamaños) y asociarlas a productos individuales. Además, gestiona el inventario de estas opciones y envía alertas cuando el stock es bajo, ayudando a mantener el control sobre la disponibilidad de productos en la tienda.
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
    );
}

const mapStateToProps = state => ({
    options: state.Products.list_admin_options,
    loading_options: state.Products.loading_options,

});

export default connect(mapStateToProps, {
    get_options_admin
})(CreateOptions);
