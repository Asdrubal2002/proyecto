import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../hocs/Layout'
import { connect } from "react-redux";

import { get_product, get_options, get_products_by_category, get_product_likes, add_like_dislike_product } from '../../redux/actions/products'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { ChatBubbleBottomCenterTextIcon, CheckIcon, StarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';

import ImageGallery from './ImageGallery';
import { add_item } from '../../redux/actions/cart';
import { Rings } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import ProductCard from './ProductCard';
import LoadingStores from '../home/LoadingStores';

import { get_product_comments, add_comment_product, delete_comment_product, edit_comment_prodcut } from '../../redux/actions/comments_products';
import { CommentsProduct } from './CommentsProduct';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ProductDetail({

    get_product,
    get_options,
    product,
    options,
    add_item,
    loading,
    isAuthenticated,
    loadingToCar,
    get_products_by_category,
    related_products,
    loading_products,
    get_product_comments,
    comments,
    profile,
    add_comment_product,
    delete_comment_product,
    edit_comment_prodcut,
    get_product_likes,
    likes,
    add_like_dislike_product,
    userLiked
}) {

    const params = useParams()
    const slugProduct = params.slugProduct

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const textareaRef = useRef(null);
    const [buttonText, setButtonText] = useState('¿Que te parecio el producto?');
    const [selectedOptionId, setSelectedOptionId] = useState(null);


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
        window.scrollTo(0, 1200);

    };

    useEffect(() => {
        get_product(slugProduct)
        get_options(slugProduct)
        get_product_comments(slugProduct)
        window.scrollTo(0, 0);
        product && product.category && get_products_by_category(product.category.store.slug, product.category.slug);
        get_product_likes(slugProduct)
    }, [slugProduct])


    const renderOptions = () => {
        if (!options || options.every(option => option.quantity === 0)) {
            return (
                <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md mb-4">
                    <p className="text-base font-semibold">Lo sentimos, no hay opciones en este momento.</p>
                </div>
            );
        }
        return (
            <>
                <h2 className="text-base font-semibold mb-4">Opciones disponibles</h2>
                <div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>

                    {options.filter(option => option.quantity > 0).map((option, index) => (
                        <div
                            key={index}
                            className={`inline-block ${option.id === selectedOptionId ? 'ring ring-azul_corp' : 'bg-stone-700'} p-2 rounded-md shadow-md transition-transform transform hover:scale-105 cursor-pointer`}
                            onClick={() => {
                                handleOptionClick(option);
                                setSelectedOptionId(option.id); // Actualizamos selectedOptionId al hacer clic en una opción
                            }}
                        >
                            <div className={`inline-block w-4 h-4 rounded-full border-box mr-3 ${option.id === selectedOptionId ? 'bg-azul_corp text-white' : 'border border-gray-300'}`}>
                                {option.id === selectedOptionId && <CheckIcon className="h-3 w-3 m-0.5" />}
                            </div>
                            <label htmlFor={`option_${index}`} className="text-sm text-gray-200">
                                <span className="font-semibold">{option.option.value}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const handleHeartClick = async () => {
        try {
            // Aquí puedes llamar a la función deseada al hacer clic en el icono del corazón
            // Asegúrate de que add_like_dislike_product devuelva una promesa
            await add_like_dislike_product(slugProduct);
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud
            console.error('Error al manejar el clic del corazón:', error);
        }
    };
    const handleComment = () => {
        const productId = product && product.id; // Aquí puedes obtener el ID del store de alguna manera
        const commentText = textareaRef.current.value;

        // Verificar si el comentario está vacío
        if (!commentText.trim()) {
            // Si el comentario está vacío, no hacer nada
            return;
        }

        console.log(productId, commentText)

        // Si el comentario no está vacío, llamar a la función add_comment_product
        add_comment_product(productId, commentText);

        // Limpiar el contenido del textarea
        textareaRef.current.value = '';

        // Cambiar el texto del botón después de enviar el comentario
        setButtonText('Gracias por comentarnos');
    };

    const posts = [
        {
            id: 1,
            title: 'Boost your conversion rate',
            href: '#',
            description:
                'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            category: { title: 'Marketing', href: '#' },
            author: {
                name: 'Michael Foster',
                role: 'Co-Founder / CTO',
                href: '#',
                imageUrl:
                    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        },
        // More posts...
    ]
    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | {product && product.name ? ` ${product.name}` : 'Ruvlo'}</title>
                <meta name="description" content="Lo que sale en google" />
                <meta name="keywords" content='palabras para google' />
                <meta name="robots" content='all' />
                <link rel="canonical" href="https://www.ruvlo.com/" />
                <meta name="author" content='Ruvlo' />
                <meta name="publisher" content='Ruvlo' />

                {/* Social Media Tags */}
                <meta property="og:title" content='Ruvlo |  Busqueda tiendas' />
                <meta property="og:description" content='descripcion.' />
                <meta property="og:url" content="https://www.ruvlo.com/" />
                <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

                <meta name="twitter:title" content='Ruvlo |  Busqueda tiendas' />
                <meta
                    name="twitter:description"
                    content='descripcion.'
                />
                <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            {loading ? <>
                <div>
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                            <div className="grid grid-cols-2 gap-13 bg-rose-500 rounded-lg animate-pulse dark:bg-gray-700">
                                <div role="status" className="flex items-center justify-center h-56 max-w-sm rounded-lg animate-pulse dark:bg-gray-700" />
                            </div>
                            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-10"></div>
                                <div className="h-2.5 bg-azul_corp rounded-full w-48 mb-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>

                <div>
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                            <ImageGallery data={product?.images} />
                            {/* Product info */}
                            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                                <div className='my-4 flex'>
                                    <Link to={`/store/${product && product.category.store.slug}`} className='text-azul_corp_ho hover:underline font-semibold'>{product && product.category.store.name}</Link>
                                    <div className='mx-4 border-r border-gray-300'></div>
                                    <Link to={`/products_by_category/${product && product.category.store.slug}/${product && product.category.slug}`} className='text-azul_corp_ho hover:underline font-semibold'>{product && product.category.name}</Link>
                                </div>

                                <h1 className="text-3xl font-semibold tracking-tight text-gray-200">{product && product.name}</h1>

                                <div className="mt-3">
                                    <h2 className="sr-only">Product information</h2>
                                    <p className="text-3xl text-gray-300">{product && product.price}</p>
                                </div>



                                <div className="mt-6">
                                    <h3 className="sr-only">Description</h3>
                                    <div className="text-base text-gray-300 space-y-6" dangerouslySetInnerHTML={{ __html: product && product.description }} />
                                </div>
                                {/* Reviews */}
                                <div className="mt-3">
                                    <h3 className="sr-only">options</h3>

                                    {renderOptions()}


                                </div>
                                {errorMessage && <div className="bg-red-200 text-red-700 p-3 rounded-md my-4  flex items-center justify-center">
                                    <p className="text-base font-semibold">{errorMessage}</p>
                                </div>}

                                {isAuthenticated ? <>
                                    <div className="mt-6">
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
                                                    className="ml-4 py-2 px-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-300 hover:text-gray-900"
                                                >
                                                    {userLiked ? (
                                                        <div className="animate-ping">
                                                            <SolidHeartIcon className="h-6 w-6 flex-shrink-0 text-red-600" />
                                                        </div>
                                                    ) : (
                                                        <OutlineHeartIcon className="h-6 w-6 flex-shrink-0 text-red-600" />
                                                    )}
                                                    <span className="ml-2  ">{likes} Me gusta</span> {/* Muestra el número de likes al lado del botón */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                    :
                                    <>
                                        <form className="mt-6">
                                            <div className="mt-10 flex sm:flex-col1">
                                                <Link
                                                    to={'/login'}
                                                    className="max-w-xs flex-1 bg-azul_corp border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                                >
                                                    Iniciar sesión
                                                </Link>
                                                <Link to={'/login'} className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-red-500">
                                                    <span className="ml-2 text-gray-400">{likes}  Me gusta</span> {/* Muestra el número de likes al lado del botón */}

                                                    <span className="sr-only">Add to favorites</span>
                                                </Link>
                                            </div>
                                        </form>
                                    </>
                                }
                                <section aria-labelledby="details-heading" className="mt-12">
                                    <h2 id="details-heading" className="sr-only">
                                        Additional details
                                    </h2>
                                    {isAuthenticated ? <div>


                                        {profile.firs_name == null ? (
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
                                                        className="rounded-lg px-4 py-2 w-full resize-none text-gray-200 text-md bg-stone-900 border-0 outline-none border-transparent"
                                                        placeholder="Cuentanos tu experiencia...."
                                                        maxLength={200} // Aquí estableces el límite de caracteres
                                                    ></textarea>

                                                    <button
                                                        onClick={() => {
                                                            handleComment();
                                                        }}
                                                        disabled={buttonText === 'Comentario enviado'} // Deshabilitar el botón después de enviar el comentario

                                                        className="mt-2 px-4 py-2 bg-azul_corp text-white rounded-lg hover:bg-azul_corp_ho focus:outline-none font-semibold"
                                                    >
                                                        {buttonText}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div> : <></>}
                                    <div className="max-h-96 overflow-y-auto scrollbar-style">
                                        {comments && Array.isArray(comments) && comments.length === 0 ? (
                                            <div className="flex items-center gap-2 bg-gray-700 p-3 rounded-md">
                                                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" />
                                                <p className="text-gray-200 font-semibold">¡Sé el primero en comentar!</p>
                                            </div>
                                        ) : (
                                            Array.isArray(comments) && comments.map((comment, index) => (
                                                <div key={index}>
                                                    <CommentsProduct
                                                        comment={comment}
                                                        profile={profile}
                                                        isAuthenticated={isAuthenticated}
                                                        delete_comment_product={delete_comment_product}
                                                        edit_comment_prodcut={edit_comment_prodcut}
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>



                                </section>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="py-6 sm:py-12">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold text-gray-300 sm:text-3xl">Productos relacionados</h2>
                            <p className="mt-2 text-md leading-8 text-gray-400">
                                Productos relacionados en venta de {product && product.category.store.name}
                            </p>
                        </div>
                        {loading_products ? <LoadingStores /> :
                            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                                {related_products && related_products.length > 0 ? (
                                    related_products.map((product, index) => (
                                        <div key={index}>
                                            <div key={index}>
                                                <ProductCard data={product} index={index} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="lg:col-span-4">
                                        <p className="text-center">No se encontraron productos relacionados.</p>
                                    </div>
                                )}
                            </div>

                        }


                    </div>
                </div>
            </>

            }

        </Layout>
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,
    loading: state.Products.loading_product,
    isAuthenticated: state.Auth.isAuthenticated,
    loadingToCar: state.Cart.loading_to_car,
    options: state.Products.options,
    related_products: state.Products_By_Category.products,
    loading_products: state.Products_By_Category.loading_products_by_category,
    comments: state.Comments_Product.comments ? state.Comments_Product.comments.comments : [],
    profile: state.Profile.profile,
    likes: state.Products.likes ? state.Products.likes.total_likes : 0,
    userLiked: state.Products.likes ? state.Products.likes.user_liked : false
})

export default connect(mapStateToProps, {
    get_product,
    get_options,
    add_item,
    get_products_by_category,
    get_product_comments,
    add_comment_product,
    delete_comment_product,
    edit_comment_prodcut,
    get_product_likes,
    add_like_dislike_product
})(ProductDetail)