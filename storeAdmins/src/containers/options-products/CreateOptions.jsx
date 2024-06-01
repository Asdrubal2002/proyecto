import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_options_admin } from '../../redux/actions/products/products';
import { Rings } from 'react-loader-spinner';
import { CheckIcon, GlobeAltIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from "axios"



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
                    console.log('Productos relacionados:', relatedProducts);

                    // Mostrar los productos relacionados en una lista
                    const productList = relatedProducts.map((product, index) => (
                        <li key={product.id}>
                            <span>{index + 1}. </span> {/* Mostrar el índice enumerado */}
                            {product.product.name} - {product.product.price}
                            {/* <Link to={`/product/${product.product.slugProduct}`}>{product.product.name} - {product.product.price}</Link> */}
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
            <form onSubmit={onSubmit} className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                <div className="mb-4">
                    <label htmlFor="valueOption" className="block text-sm font-medium text-gray-300">Nombre de la opción *</label>
                    <input
                        type="text"
                        name="valueOption"
                        id="valueOption"
                        placeholder="Nombre de la opción"
                        className="placeholder:text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
                        value={formData.valueOption}
                        onChange={handleChange}
                        required
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>

                <div className="flex">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-azul_corp hover:bg-azul_corp_ho"
                    >
                        Guardar Opción
                    </button>
                    {
                        messageEdit ? <>
                            <button onClick={() => clearFormData()} className="m-2 text-gray-100 text-sm bg-red-500 px-2 rounded-md font-medium">Cancelar la edición.</button>

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
