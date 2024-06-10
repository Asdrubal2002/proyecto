import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { PencilSquareIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FormCategories from '../../containers/categories/FormCategories'
import axios from "axios"
import { get_products } from '../../redux/actions/products/products'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreateProduct({
    categories,
    get_products,
    count
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
        const data = Object.fromEntries(formData.entries());  // Use entries to include all form data
        const editorContent = description;
        formData.set('description', editorContent);

        // Validar campos requeridos
        const errors = {};
        if (!data.name) errors.name = 'El nombre es obligatorio';
        // if (!editorContent.trim()) errors.description = 'La descripción es obligatoria'; // Validar la descripción
        if (!data.category) errors.category = 'La categoría es obligatoria';
        if (!data.price) errors.price = 'El precio es obligatorio';
        else if (!/^\d+(\.\d{1,2})?$/.test(data.price)) errors.price = 'El precio debe ser un número entero sin puntos ni comas.';
        if (data.tax && !/^\d+$/.test(data.tax)) errors.tax = 'El Impuesto debe ser un número entero.';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Si el campo tax está vacío, eliminarlo del formData
        if (!data.tax) {
            formData.delete('tax');
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
                    get_products();
                } else {
                    setLoading(false);
                    get_products();
                    resetStates();
                }
            } catch (err) {
                setLoading(false);
                alert('Error al enviar', err);
            }
        };

        fetchData();
        setOpen(false);
    }

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };
    return (
        <>
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-200">¿Tienes otro producto nuevo? </h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <button
                            onClick={e => setOpen(true)}
                            className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none "
                        >
                            Crear producto, tienes {count} productos
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-stone-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                    <div className='py-4'>
                                        <Disclosure>
                                            <div className='flex'>
                                                <Disclosure.Button className="flex items-center justify-center py-2 text-gray-300 bg-azul_corp rounded-lg text-sm p-4 mb-2">
                                                    <span>¿Necesitas una nueva categoría?</span>
                                                    <PlusIcon className="ml-1" width={10} height={10} color="#fff" radius="6" />
                                                </Disclosure.Button>
                                                <button
                                                    type="button"
                                                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>


                                            <Disclosure.Panel className="text-gray-500">
                                                <FormCategories />
                                            </Disclosure.Panel>
                                        </Disclosure>
                                    </div>
                                    <form onSubmit={handleSubmit} className="">
                                        <div className='mb-4'>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 flex-grow">Nombre tu producto:</label>

                                            <input
                                                name='name'
                                                type='text'
                                                placeholder='Ejemplo: Celular moro f 2016'
                                                className="mt-1 p-2 rounded-md w-full focus:outline-none bg-stone-700 text-sm sm:leading-6 placeholder:text-gray-400 text-gray-200"
                                            />
                                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 flex-grow">Selecciona a que categoría pertenece tu producto:</label>

                                            <select
                                                name='category'
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                                className="mt-1 p-2 rounded-md w-full focus:outline-none bg-stone-700 text-sm sm:leading-6 text-gray-100"
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
                                        </div>
                                        <div className='mb-4'>
                                            <div className='text-gray-900 text-sm '>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 flex-grow">Describe tu producto</label>

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
                                                            items: ['bold', 'italic', 'underline', '|', // Negrita, cursiva, subrayado 
                                                            ]
                                                        },
                                                    }}
                                                />
                                            </div>
                                            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                                            {descriptionError && <span className="text-red-500 text-sm">{descriptionError}</span>}
                                        </div>

                                        <div className='mb-4 flex'>
                                            <div className='w-full mr-2'>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 flex-grow">Precio de tu producto</label>
                                                <input
                                                    name='price'
                                                    type='text'
                                                    placeholder='Ejemplo: 10000'
                                                    className=" p-2 rounded-md focus:outline-none bg-stone-700 text-sm sm:leading-6 placeholder:text-gray-400 text-gray-200 w-full"
                                                />
                                                {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                                            </div>
                                            <div className='w-full'>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 flex-grow">impuesto de tu producto</label>
                                                <input
                                                    name='tax'
                                                    type='text'
                                                    placeholder='Porcentajes, ejemplo: 19, 5, 21, 25, ...'
                                                    className="p-2 rounded-md focus:outline-none bg-stone-700 text-sm sm:leading-6 placeholder:text-gray-400 text-gray-200 w-full"
                                                />
                                                {errors.tax && <span className="text-red-500 text-sm">{errors.tax}</span>}
                                            </div>


                                        </div>


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
    categories: state.Product_category.categories,
    count: state.Products.count,

})
export default connect(mapStateToProps, {
    get_products
})(CreateProduct)
