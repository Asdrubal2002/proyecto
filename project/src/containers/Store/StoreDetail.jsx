import Layout from "../../hocs/Layout";
import React, { useRef } from 'react';

import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { get_store, get_related_stores } from "../../redux/actions/stores";
import { useEffect, useState, Fragment } from "react";

//import { get_products } from "../../redux/actions/products";
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import { ClockIcon, MapIcon, GlobeAmericasIcon, CurrencyDollarIcon, PaperAirplaneIcon, BuildingStorefrontIcon, ExclamationCircleIcon, ChatBubbleBottomCenterTextIcon, MinusIcon, PlusIcon, UserCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import LoadingStore from "../../components/store/LoadingStore";
import { ConetenedorBanner, ConetenedorBanner1, ConetenedorInfo, ConetenedorInfo1, ConetenedorInfo2, ConetenedorProfile, ConetenedorProfile1, ConetenedorProfile2, ConetenedorProfile3, EspacioContenedor, Principal } from "../../components/store/styles/LoadingStore";
import { BotonesMeGustaNOMegusta, ContenedorInfoUbication, ContenedorInfoUbication1, DescriptionStore, EspacioPhotos, Photo, StoreProfile, SeparadorVertical } from "./styles/StoreDetail";

import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

import { get_categories_products_store } from "../../redux/actions/product_categories";
import LoadingCategoriesStores from "../../components/store/LoadingCategoriesStores";

import { get_products, get_products_list_page } from "../../redux/actions/products";
import LoadingStores from "../../components/home/LoadingStores";
import ProductList from "../../components/product/ProductList";
import Searcher from "../../components/searcher/Searcher";
import { Helmet } from "react-helmet";
import CategoriesStore from "./CategoriesStore";
import { add_to_wish_list_store } from "../../redux/actions/wish_list_stores";
import { get_store_comments, add_comment_store, delete_comment_store, edit_comment_store } from "../../redux/actions/comments_store";
import CategoriesStoreMobile from "./CategoriesStoreMobile";
import CommentStore from "../../components/store/CommentStore";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const StoreDetail = ({
    get_store,
    get_related_stores,
    store,
    loading,
    get_categories_products_store,
    categories,
    loading_categories,
    get_products,
    get_products_list_page,
    products,
    loading_products,
    count,
    add_to_wish_list_store,
    next,
    previous,
    get_store_comments,
    comments,
    add_comment_store,
    isAuthenticated,
    profile,
    delete_comment_store,
    edit_comment_store

}) => {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const textareaRef = useRef(null);
    const [buttonText, setButtonText] = useState('Compartir');


    const handleHeartClick = () => {
        // Aquí puedes llamar a la función deseada al hacer clic en el icono del corazón

        add_to_wish_list_store(storeSlug)
    };

    const params = useParams()
    const storeSlug = params.storeSlug

    useEffect(() => {
        get_store(storeSlug)
        //get_related_stores(storeSlug)
        get_categories_products_store(storeSlug)
        get_products(storeSlug)
        get_store_comments(storeSlug)
    }, [])

    const handleComment = () => {
        const storeId = store && store.id;
        const commentText = textareaRef.current.value;

        // Verificar si el comentario está vacío
        if (!commentText.trim()) {
            // Si el comentario está vacío, no hacer nada
            return;
        }

        // Si el comentario no está vacío, llamar a la función add_comment_store
        add_comment_store(storeId, commentText);

        // Limpiar el contenido del textarea
        textareaRef.current.value = '';

        // Cambiar el texto del botón después de enviar el comentario
        setButtonText('Gracias por comentarnos');
    };

    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleCategory = categoryId => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>{store && store.name ? `Ruvlo | ${store.name}` : 'Ruvlo'}</title>
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
                <meta name="twitter:description" content='descripcion.' />
                <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {loading ?
                <LoadingStore />
                :
                <>
                    <Principal>
                        {/* banner img */}
                        <ConetenedorBanner>
                            <ConetenedorBanner1>
                                <Photo src={store && store.banner} />
                                <EspacioPhotos ria-hidden="true" />
                            </ConetenedorBanner1>
                            <EspacioContenedor />
                        </ConetenedorBanner>
                        {/* COMPANY PROFILE */}
                        <ConetenedorProfile>
                            <ConetenedorProfile1>
                                <div>
                                    {/* User info */}
                                    <ConetenedorProfile2>
                                        <ConetenedorProfile3>
                                            {/* profile picture */}
                                            <div className="flex">
                                                <StoreProfile src={store && store.logo} alt="Store Photo" />
                                            </div>
                                            <ConetenedorInfo>
                                                <ConetenedorInfo1>
                                                    <BotonesMeGustaNOMegusta onClick={handleHeartClick}>{store && store.likes} Me gusta</BotonesMeGustaNOMegusta>
                                                </ConetenedorInfo1>
                                            </ConetenedorInfo>
                                        </ConetenedorProfile3>
                                        {/* Store name */}
                                        <ConetenedorInfo2>
                                            <h1 className="text-2xl text-color_letra_blanca">
                                                {store && store.name}
                                                {store && store.verified ? <CheckBadgeIcon className="h-5 w-5 inline-block text-blue-500" /> : <></>}
                                            </h1>
                                        </ConetenedorInfo2>
                                        {/* Store description */}
                                        <DescriptionStore>
                                            {store && store.description}
                                        </DescriptionStore>
                                        {/* Store data */}
                                        <ContenedorInfoUbication>
                                            <ContenedorInfoUbication1>
                                                <GlobeAmericasIcon className="h-4 w-4 mr-2 inline-block" />
                                                {store && store.city.estado_o_departamento.pais.nombre} - {store && store.city.nombre}
                                            </ContenedorInfoUbication1>
                                            <SeparadorVertical>|</SeparadorVertical>
                                            <ContenedorInfoUbication1>
                                                <CurrencyDollarIcon className="h-4 w-4 mr-2 inline-block" />
                                                {store && store.city.estado_o_departamento.pais.currency.name} ({store && store.city.estado_o_departamento.pais.currency.typecurrency})
                                            </ContenedorInfoUbication1>
                                            <SeparadorVertical>|</SeparadorVertical>
                                            <ContenedorInfoUbication1>
                                                <MapIcon className="h-4 w-4 mr-2 inline-block" />
                                                {store && store.location}
                                            </ContenedorInfoUbication1>
                                            <SeparadorVertical>|</SeparadorVertical>
                                            <ContenedorInfoUbication1>
                                                <ClockIcon className="h-4 w-4 mr-2 inline-block" />
                                                {store && store.schedule}
                                            </ContenedorInfoUbication1>
                                            {store && store.delivery ? <>
                                                <SeparadorVertical>|</SeparadorVertical>
                                                <ContenedorInfoUbication1>
                                                    <PaperAirplaneIcon className="h-4 w-4 mr-2 inline-block" />
                                                    Envios a domicilio
                                                </ContenedorInfoUbication1>
                                            </> : <></>}
                                        </ContenedorInfoUbication>
                                    </ConetenedorProfile2>
                                </div>
                            </ConetenedorProfile1>
                        </ConetenedorProfile>
                    </Principal>
                    <div>
                        <div>
                            {/* Mobile filter dialog */}
                            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setMobileFiltersOpen}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition-opacity ease-linear duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity ease-linear duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                                    </Transition.Child>
                                    <div className="fixed inset-0 z-40 flex">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition ease-in-out duration-300 transform"
                                            enterFrom="translate-x-full"
                                            enterTo="translate-x-0"
                                            leave="transition ease-in-out duration-300 transform"
                                            leaveFrom="translate-x-0"
                                            leaveTo="translate-x-full"
                                        >
                                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-stone-600 py-4 pb-12 shadow-xl">
                                                <div className="flex items-center justify-between px-4">
                                                    <h2 className="text-lg font-medium text-gray-900">Categorias</h2>
                                                    <div className="fixed inset-0 z-40 flex">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-in-out duration-300"
                                                            enterFrom="translate-x-full"
                                                            enterTo="translate-x-0"
                                                            leave="ease-in-out duration-300"
                                                            leaveFrom="translate-x-0"
                                                            leaveTo="translate-x-full"
                                                        >
                                                            <Dialog.Panel className="ml-auto w-full max-w-xs h-full flex-col overflow-y-auto bg-stone-800 py-4 pb-12 shadow-xl">
                                                                <div className="px-4">
                                                                    <ul role="list" className="space-y-4 pb-6 text-sm font-medium text-gray-200">
                                                                        {loading_categories ? (
                                                                            <LoadingCategoriesStores />
                                                                        ) : (
                                                                            <CategoriesStoreMobile categories={categories} loading_categories={loading_categories} storeSlug={storeSlug} />
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </Dialog.Panel>
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition.Root>
                            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 pt-10">
                                    <Searcher className="flex-1" />
                                    <div className="flex items-center mt-4 sm:mt-0">
                                        <h2 className="flex items-center text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
                                            <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-gray-600" aria-hidden="true" /> {/* Agrega el icono de búsqueda */}
                                            {count} Productos
                                        </h2>
                                        <button
                                            type="button"
                                            className="ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                            onClick={() => setMobileFiltersOpen(true)}
                                        >
                                            <span className="sr-only">Filters</span>
                                            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                                    <h2 id="products-heading" className="sr-only">
                                        Products
                                    </h2>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                        {/* Primera columna */}
                                        <div className="lg:col-span-1">
                                            {/* Primera fila */}
                                            <div className="grid grid-cols-1 gap-y-10">
                                                {/* Contenido de la primera fila */}

                                                <div className="container mx-auto px-4 py-8">
                                                    <CategoriesStore categories={categories} loading_categories={loading_categories} storeSlug={storeSlug} />
                                                </div>
                                                {/* <div>
                                                   
                                                </div> */}
                                                {isAuthenticated ?
                                                    <div>
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
                                                    </div>
                                                    : <></>}

                                            </div>
                                            {/* Segunda fila */}
                                            <div>
                                                {comments && Array.isArray(comments) && comments.length === 0 ? (
                                                    <div className="flex items-center gap-2 bg-gray-700 p-3 rounded-md">
                                                        <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" />
                                                        <p className="text-gray-200 font-semibold">¡Sé el primero en comentar!</p>
                                                    </div>
                                                ) : (
                                                    Array.isArray(comments) && comments.map((comment, index) => (
                                                        <div key={index}>
                                                            <CommentStore comment={comment} profile={profile} isAuthenticated={isAuthenticated} delete_comment_store={delete_comment_store} edit_comment_store={edit_comment_store}/>

                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                        {/* Segunda columna */}
                                        <div className="lg:col-span-3">
                                            {loading_products ?
                                                <LoadingStores /> :
                                                <>
                                                    {
                                                        products && products.length > 0 ? (
                                                            <ProductList products={products && products} get_products_list_page={get_products_list_page} storeSlug={storeSlug} count={count && count} />
                                                        ) : (
                                                            <div className="bg-gray-800 text-gray-200 rounded-md p-4">
                                                                <p className="text-center text-gray-300 mb-2">No hay productos para esta tienda.</p>
                                                            </div>
                                                        )
                                                    }
                                                </>}
                                        </div>
                                    </div>
                                </section>
                            </main>
                        </div>
                    </div>
                </>
            }
        </Layout>
    )
}
const mapStateToProps = state => ({
    store: state.Stores.store,
    loading: state.Stores.loading,
    categories: state.Store_Categories_Products.categories,
    loading_categories: state.Store_Categories_Products.loading_category_products,
    products: state.Products.products,
    loading_products: state.Products.loading_products,
    count: state.Products.count,
    next: state.Products.next,
    previous: state.Products.previous,
    comments: state.Comments_Store.comments,
    isAuthenticated: state.Auth.isAuthenticated,
    profile: state.Profile.profile
})

export default connect(mapStateToProps, {
    get_store,
    get_related_stores,
    get_categories_products_store,
    get_products,
    get_products_list_page,
    add_to_wish_list_store,
    get_store_comments,
    add_comment_store,
    delete_comment_store,
    edit_comment_store
})(StoreDetail)