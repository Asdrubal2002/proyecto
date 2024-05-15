import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { PencilSquareIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import FormCategories from '../../containers/categories/FormCategories'
import axios from "axios"
import { get_products } from '../../redux/actions/products/products'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreateProduct({
    categories,
    get_products
}) {
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [formCanBeSubmitted, setFormCanBeSubmitted] = useState(true);
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const editorContent = description;
        formData.set('description', editorContent);

        // Validar campos requeridos
        const errors = {};
        if (!data.name) errors.name = 'El nombre es obligatorio';
        // if (!editorContent.trim()) errors.description = 'La descripción es obligatoria'; // Validar la descripción
        if (!data.category) errors.category = 'La categoría es obligatoria';
        if (!data.price) errors.price = 'El precio es obligatorio';
        else if (!/^\d+$/.test(data.price)) errors.price = 'El precio debe ser un número entero sin puntos decimales. No se permiten espacios ni comas.';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Agregamos el Content-Type adecuado
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/create-product/`,
                    formData,
                    config
                );

                if (res.status === 200) {
                    setLoading(false);
                    get_products()
                } else {
                    setLoading(false);
                    get_products()
                    resetStates();
                }
            } catch (err) {
                setLoading(false);
                alert('Error al enviar', err);
            }
        };

        fetchData();
        setOpen(false)
    }
    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };
    return (
        <>
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-200">¿Tienes otro producto nuevo?</h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <button
                            onClick={e => setOpen(true)}
                            className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none "
                        >
                            Crear producto
                        </button>
                    </div>
                </div>
            </div>
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
                                    <div className='py-4'>
                                        <Disclosure>
                                            <Disclosure.Button className="flex items-center justify-center py-2 text-gray-300 bg-azul_corp rounded-lg text-sm p-4 mb-2">
                                                <span>¿Necesitas una nueva categoría?</span>
                                                <PlusIcon className="ml-1" width={10} height={10} color="#fff" radius="6" />
                                            </Disclosure.Button>

                                            <Disclosure.Panel className="text-gray-500">
                                                <FormCategories />
                                            </Disclosure.Panel>
                                        </Disclosure>
                                    </div>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <input
                                            name='name'
                                            type='text'
                                            placeholder='Nuevo nombre'
                                            className="p-2 rounded-md focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                        />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        <select
                                            name='category'
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                        >
                                            <option value="">Seleccione una categoría...</option>
                                            {categories && categories.map(category => (
                                                <optgroup key={category.id} label={category.name}>
                                                    {category.sub_categories && category.sub_categories.length > 0 && (
                                                        // Agregar las subcategorías dentro del optgroup
                                                        category.sub_categories.map(subCategory => (
                                                            <option key={subCategory.id} value={subCategory.id}>
                                                                {subCategory.name}
                                                            </option>
                                                        ))
                                                    )}
                                                </optgroup>
                                            ))}
                                        </select>
                                        {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                                        <div className='text-gray-900 text-sm '>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={description}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setDescription(data);
                                                    if (data.length > 5000) {
                                                        setDescriptionError('La descripción no debe exceder los 5000 caracteres');
                                                        setFormCanBeSubmitted(false); // Deshabilitar el formulario
                                                    } else {
                                                        setDescriptionError('');
                                                        setFormCanBeSubmitted(true); // Habilitar el formulario
                                                    }
                                                }}
                                                config={{
                                                    toolbar: {
                                                        items: [ 'bold', 'italic', 'underline', '|', // Negrita, cursiva, subrayado 
                                                        ]
                                                    },
                                                }}
                                            />
                                        </div>
                                        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                                        {descriptionError && <span className="text-red-500 text-sm">{descriptionError}</span>}
                                        <input
                                            name='price'
                                            type='text'
                                            placeholder='Precio'
                                            className="p-2 rounded-md focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                                        />
                                        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            disabled={!formCanBeSubmitted}
                                        >Crear producto</button>
                                    </form>
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
    categories: state.Product_category.categories
})
export default connect(mapStateToProps, {
    get_products
})(CreateProduct)
