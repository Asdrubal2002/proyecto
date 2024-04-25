import React from 'react'
import { connect } from "react-redux";
import ImageGallery from './ImageGallery';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { get_options } from '../../redux/actions/products';
import { useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { add_item } from '../../redux/actions/cart';
import { add_to_wish_list } from '../../redux/actions/wish_list';
import { HeartIcon } from '@heroicons/react/24/solid';
import { get_product_comments } from '../../redux/actions/comments_products';


function ProductModal({
    data,
    isAuthenticated,
    get_options,
    options,
    loading,
    loadingToCar,
    add_item,
    add_to_wish_list,
    get_product_comments
}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        get_options(data.slugProduct)
    }, [])

    const handleOptionClick = (optionValue) => {
        // Establecer la opción seleccionada
        setSelectedOption(optionValue);
        setErrorMessage(''); // Limpiar cualquier mensaje de error cuando se selecciona una opción

    };


    const renderOptions = () => {
        if (!options || options.every(option => option.quantity === 0)) {
            return (
                <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md mb-4">
                    <p className="text-base font-semibold">Lo sentimos, no hay opciones en este momento.</p>
                </div>
            );
        }

        return (
            <div>
                <h2 className="text-lg font-semibold mb-2">Escoge tu opción</h2>
                {options.filter(option => option.quantity > 0).map((option, index) => (
                    <button
                        key={index}
                        className="inline-block bg-gray-800 text-white rounded-lg px-4 py-2 m-1 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
                        onClick={() => handleOptionClick(option)} // Manejador de clic para la opción
                    >
                        {option.option.value}
                    </button>
                ))}
            </div>
        );
    };


    const addItemToCart = async () => {
        if (!options || options.length === 0) {
            // Si el producto no tiene opciones, llamar directamente a addItemToCart sin seleccionar una opción
            //add_item(product.id, selectedOption)
            //navigate(`/store/${product.category.store.slug}`);
            return;
        }

        if (!selectedOption) {
            setErrorMessage('Por favor selecciona una opción'); // Establecer mensaje de error si no se ha seleccionado ninguna opción
            return; // Salir de la función si no se ha seleccionado ninguna opción
        }
        // Lógica para agregar el producto al carrito con la opción seleccionada
        await add_item(selectedOption.id)
        //navigate(`/store/${product.category.store.slug}`);

    };

    const handleHeartClick = () => {
        // Aquí puedes llamar a la función deseada al hacer clic en el icono del corazón

        add_to_wish_list(data.slugProduct)
    };

    return (
        <div>
            <div className="max-w-2xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <ImageGallery data={data?.images} />
                    {/* data info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className='my-4 flex'>
                            <Link to={`/${data && data.slugProduct}/detail`} className='text-azul_corp_ho hover:text-azul_corp font-semibold'>Más detalles</Link>
                            <div className='mx-4 border-r border-gray-300'></div>
                            <Link to={`/products_by_category/${data && data.category.store.slug}/${data && data.category.slug}`} className='text-azul_corp_ho hover:text-azul_corp font-semibold'>{data && data.category.name}</Link>
                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight text-gray-200">{data && data.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">data information</h2>
                            <p className="text-3xl text-gray-300">$ {data && data.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-300 space-y-6" dangerouslySetInnerHTML={{ __html: data && data.description }} />
                        </div>

                        <div className="mt-3">
                            <h3 className="sr-only">options</h3>
                            {loading ?
                                <Rings width={20} height={20} color="#fff" radius="6" />
                                : <>{renderOptions()}</>}

                        </div>
                        {errorMessage && <div className="bg-red-200 text-red-700 p-3 rounded-md my-4  flex items-center justify-center">
                            <p className="text-base font-semibold">{errorMessage}</p>
                        </div>}
                        {
                            isAuthenticated ? <div className="mt-6">
                                <div className="mt-10 flex sm:flex-col1">
                                    {loadingToCar ? <>
                                        <button className="max-w-xs flex-1 bg-azul_corp border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                                            <Rings width={20} height={20} color="#fff" radius="6" />
                                        </button>
                                    </> : <>
                                        <button
                                            onClick={addItemToCart}
                                            type="submit"
                                            disabled={!options || options.every(option => option.quantity === 0)}
                                            className="max-w-xs flex-1 bg-azul_corp border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-azul_corp_ho  sm:w-full">
                                            Agregar al carrito
                                        </button>

                                    </>}
                                    <div className="flex items-center">
                                        <button
                                            onClick={handleHeartClick}
                                            className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-red-500 hover:bg-gray-700"
                                        >
                                            <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                            <span className="sr-only">Agregar a favoritos
                                            </span>
                                        </button>
                                        <span className="ml-2 text-gray-400">{data.likes}</span> {/* Muestra el número de likes al lado del botón */}
                                    </div>
                                </div>
                            </div>
                                : <>
                                  <div className="mt-6">
                                            <div className="mt-10 flex sm:flex-col1">
                                                <Link
                                                    to={'/login'}
                                                    className="max-w-xs flex-1 bg-azul_corp border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                                >
                                                    Iniciar sesión
                                                </Link>
                                                <Link to={'/login'} className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-red-500 hover:bg-gray-100 hover:text-gray-500">
                                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                                    <span className="sr-only">Add to favorites</span>
                                                </Link>
                                            </div>
                                        </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    options: state.Products.options,
    loading: state.Products.loading_product,
    loadingToCar: state.Cart.loading_to_car,



})

export default connect(mapStateToProps, {
    get_options,
    add_item,
    add_to_wish_list,
    get_product_comments
})(ProductModal)

