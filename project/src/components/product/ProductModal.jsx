import React from 'react'
import { connect } from "react-redux";
import ImageGallery from './ImageGallery';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { add_like_dislike_product, get_options, get_product_likes } from '../../redux/actions/products';
import { useState, useRef } from 'react';
import { Rings } from 'react-loader-spinner';
import { add_item, get_user_carts } from '../../redux/actions/cart';
import { ChatBubbleBottomCenterTextIcon, ChevronUpIcon, UserCircleIcon, CurrencyDollarIcon, CheckIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { Disclosure } from '@headlessui/react'
import { add_comment_product, delete_comment_product, edit_comment_prodcut, get_product_comments } from '../../redux/actions/comments_products';
import { CommentsProduct } from './CommentsProduct';
import DOMPurify from 'dompurify'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon, ShoppingCartIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Comments from './Components/Comments';
import Options from './Components/Options';



function ProductModal({
    data,
    isAuthenticated,
    get_options,
    options,
    loading,
    loadingToCar,
    add_item,
    profile,
    get_product_comments,
    comments,
    comments_count,
    delete_comment_product,
    edit_comment_prodcut,
    add_comment_product,
    loading_comments,
    get_product_likes,
    likes,
    add_like_dislike_product,
    userLiked,
    cart_count,
    get_user_carts,
    closeModal

}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const textareaRef = useRef(null);
    const [buttonText, setButtonText] = useState('¿Que te parecio el producto?');

    const [selectedOptionId, setSelectedOptionId] = useState(null);


    useEffect(() => {
        get_options(data.slugProduct)
        get_product_comments(data.slugProduct)
        get_product_likes(data.slugProduct)
    }, [])

    const handleOptionClick = (optionValue) => {
        // Establecer la opción seleccionada
        setSelectedOption(optionValue);
        setErrorMessage(''); // Limpiar cualquier mensaje de error cuando se selecciona una opción

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
        get_user_carts()
        closeModal();
    };
    const handleHeartClick = async () => {
        try {
            // Aquí puedes llamar a la función deseada al hacer clic en el icono del corazón
            // Asegúrate de que add_like_dislike_product devuelva una promesa
            await add_like_dislike_product(data.slugProduct);
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud
            console.error('Error al manejar el clic del corazón:', error);
        }
    };

    const handleComments = async (e) => {
        e.stopPropagation();
        // Aquí pued2es llamar a la función deseada al hacer clic en el icono del corazón
        console.log("asd", data.slugProduct)
        //await 
    };

    const handleComment = () => {
        const productId = data && data.id; // Aquí puedes obtener el ID del store de alguna manera
        const commentText = textareaRef.current.value;

        // Verificar si el comentario está vacío
        if (!commentText.trim()) {
            // Si el comentario está vacío, no hacer nada
            return;
        }
        // Si el comentario no está vacío, llamar a la función add_comment_product
        add_comment_product(productId, commentText);

        // Limpiar el contenido del textarea
        textareaRef.current.value = '';

        // Cambiar el texto del botón después de enviar el comentario
        setButtonText('Gracias por comentarnos');
    };

    return (
        <div className='font-estilo_letra'>
            <div className="max-w-2xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <ImageGallery data={data?.images} />
                    {/* data info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className='my-4 flex'>
                            <Link to={`/${data && data.slugProduct}/detail`} className='text-azul_corp_ho hover:text-azul_corp font-semibold text-sm'>Más detalles</Link>
                            <div className='mx-4 border-r border-gray-300'></div>
                            <Link to={`/products_by_category/${data && data.category.store.slug}/${data && data.category.slug}`} className='text-azul_corp_ho hover:text-azul_corp font-semibold text-sm'>{data && data.category.name}</Link>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-gray-200">{data && data.name}</h1>

                        <div className="mt-3 ">
                            {data && data.tax && (
                                <p className='text-xs flex items-center'>
                                    <InformationCircleIcon className="w-6 h-6 text-yellow-700 mr-2 " />
                                    Este producto incluye un impuesto de {data.tax}%
                                </p>
                            )}
                            <p className="text-3xl text-gray-300 flex items-center font-bold my-4"><CurrencyDollarIcon className="w-8 h-8 text-green-500" /> {data && data.price_with_tax}</p>
                        </div>

                        <div className="mt-6 border-b border-gray-300 pb-4">
                            {/* <h3 className="text-xl font-bold text-gray-400 mb-2">Descripción</h3> */}
                            <p className="text-md text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data && data.description) }} />
                        </div>
                        <div className="mt-6">
                            <h3 className="sr-only">options</h3>
                            {loading ?
                                <Rings width={20} height={20} color="#fff" radius="6" />
                                : <>
                                    <Options
                                        options={options}
                                        selectedOptionId={selectedOptionId}
                                        handleOptionClick={handleOptionClick}
                                        setSelectedOptionId={setSelectedOptionId}
                                        errorMessage={errorMessage}
                                    />
                                </>}
                        </div>
                        {errorMessage && <div className="bg-red-200 text-red-700 p-3 rounded-md my-2  flex items-center justify-center">
                            <p className="text-base font-semibold">{errorMessage}</p>
                        </div>}
                        {
                            isAuthenticated ? <div className="mt-6">
                                <div className="mt-2 flex sm:flex-col1">
                                    {loadingToCar ? <>
                                        <button >
                                            <Rings width={20} height={20} color="#fff" radius="6" />
                                        </button>
                                    </> : <>
                                        <button
                                            onClick={addItemToCart}
                                            type="submit"
                                            disabled={!options || options.every(option => option.quantity === 0)}
                                            className="max-w-xs flex-1 bg-azul_corp border border-transparent rounded-md flex items-center justify-center text-md hover:bg-azul_corp_ho sm:w-full">
                                            <ShoppingCartIcon className="h-6 w-6 text-gray-400 m-2" />
                                            Agregar al carrito
                                        </button>

                                    </>}
                                    <div className="flex items-center">
                                        <button
                                            onClick={handleHeartClick}
                                            className="ml-4 py-2 px-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-300 hover:text-gray-900"
                                        >
                                            {userLiked ? (
                                                <div className="animate-ping">
                                                    <SolidHeartIcon className="h-6 w-6 flex-shrink-0 text-red-600" />
                                                </div>
                                            ) : (
                                                <OutlineHeartIcon className="h-6 w-6 flex-shrink-0 text-red-600" />
                                            )}
                                            <span className="ml-2">{likes} Me gusta</span> {/* Muestra el número de likes al lado del botón */}
                                        </button>
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
                                            <Link to={'/login'} className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-red-500">
                                                <span className="ml-2 text-gray-400">{likes}  Me gusta</span> {/* Muestra el número de likes al lado del botón */}
                                            </Link>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                    <section aria-labelledby="details-heading" className="mt-4">
                        <Disclosure>
                            <Disclosure.Button className="pb-2" onClick={handleComments}>
                                <p className="hover:bg-stone-800 p-2 rounded-md text-sm font-medium ">
                                    {comments_count}  Comentarios del producto
                                </p>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                {isAuthenticated ? <div>
                                    {
                                        profile.firs_name == null ? (
                                            <div className="bg-stone-800 text-gray-100 rounded-md mb-8">
                                                <p className="text-center text-gray-200 mb-2 font-sm">No puedes comentar, no tienes perfil creado.</p>
                                                <Link to={'/dashboard'} className="flex items-center justify-center text-sm font-medium text-white mt-2 bg-azul_corp p-2 rounded-b-md">
                                                    <UserCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                                    Ir al perfil del usuario
                                                    {/* <span className="text-xs bg-red-500 text-white font-semibold rounded-full px-2 text-center ml-2">{cart_count}</span> */}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex items-start pb-5">
                                                <div className="flex flex-col w-full">
                                                    <textarea
                                                        ref={textareaRef}
                                                        id="commentTextArea"
                                                        className="rounded-lg px-4 py-2 w-full resize-none text-gray-200 text-md bg-stone-800 border-0 outline-none border-transparent text-sm"
                                                        placeholder="Cuentanos tu experiencia...."
                                                        maxLength={200} // Aquí estableces el límite de caracteres
                                                    ></textarea>
                                                    <button
                                                        onClick={() => {
                                                            handleComment();
                                                        }}
                                                        disabled={buttonText === 'Comentario enviado'} // Deshabilitar el botón después de enviar el comentario
                                                        className="mt-2 px-4 py-2 bg-azul_corp text-white rounded-lg hover:bg-azul_corp_ho focus:outline-none text-md"
                                                    >
                                                        {buttonText}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div> :
                                    <>
                                    </>
                                }
                                {/* Otras partes de tu componente */}
                                <Comments
                                    loading={loading_comments}
                                    comments={comments}
                                    profile={profile}
                                    isAuthenticated={isAuthenticated}
                                    delete_comment_product={delete_comment_product}
                                    edit_comment_prodcut={edit_comment_prodcut}
                                />
                                {/* Otras partes de tu componente */}
                            </Disclosure.Panel>
                        </Disclosure>
                    </section>

                </div>
            </div>
            <button onClick={closeModal} className="flex w-full py-2 px-4 text-white items-center justify-center font-semibold rounded-md shadow-md shadow-stone-700 hover:bg-stone-800 focus:outline-none">
                <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
            </button>

        </div>
    )
}

const mapStateToProps = state => ({
    options: state.Products.options,
    loading: state.Products.loading_product,
    loadingToCar: state.Cart.loading_to_car,
    profile: state.Profile.profile,
    comments: state.Comments_Product.comments ? state.Comments_Product.comments.comments : [],
    comments_count: state.Comments_Product.comments ? state.Comments_Product.comments.comments_count : 0,
    loading_comments: state.Comments_Product.loading_product,
    likes: state.Products.likes ? state.Products.likes.total_likes : 0,
    userLiked: state.Products.likes ? state.Products.likes.user_liked : false,
    cart_count: state.Cart.carts.cart_count,

})

export default connect(mapStateToProps, {
    get_options,
    add_item,
    get_product_comments,
    delete_comment_product,
    edit_comment_prodcut,
    add_comment_product,
    get_product_likes,
    add_like_dislike_product,
    get_user_carts
})(ProductModal)

