import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_options_admin } from '../../redux/actions/products/products';
import { Rings } from 'react-loader-spinner';
import { CheckIcon, GlobeAltIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function CreateOptions({
    options,
    loading_options
}) {
    useEffect(() => {
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const maxChars = 150;
    const initialFormData = {
        valueOption: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.valueOption.length > maxChars) {
            setError(`El nombre de la opción no puede exceder los ${maxChars} caracteres.`);
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('value', formData.valueOption);
        console.log(formDataToSend);
        setFormData(initialFormData);
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
                </div>
            </form>

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
                                            <TrashIcon width={20} height={20} color="#fff" radius="6" onClick={() => handleDeleteOption(option.id)} />
                                        </button>
                                        <button className="ml-2 focus:outline-none">
                                            <PencilIcon width={20} height={20} color="#fff" radius="6" onClick={() => handleEditOption(option.id)} />
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
    loading_options: state.Products.loading_options
});

export default connect(mapStateToProps, {

})(CreateOptions);
