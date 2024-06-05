import Layout from "../../hocs/Layout";
import React, { useEffect, useRef, useState, Fragment } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { get_products_filtered, get_products_filtered_page } from "../../redux/actions/products";
import Searcher from "../searcher/Searcher";
import { FunnelIcon, GiftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from '@headlessui/react'
import CategoriesStoreMobile from "../../containers/Store/CategoriesStoreMobile";
import CategoriesStore from "../../containers/Store/CategoriesStore";
import LoadingStores from "../home/LoadingStores";
import ProductListFiltered from "./ProductListFiltered";
import SearchForm from "../searcher/SearchForm";
import FooterStores from "../store/FooterStores";
import LoadingCategoriesStores from "../store/LoadingCategoriesStores";
import SearchProductosForm from "../searcher/SearchProductosForm";
import CartProductStore from "../../containers/Cart/CartProductStore";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ProductsFiltered = ({
    get_products_filtered,
    products,
    count,
    next,
    previous,
    loading_products,
    categories,
    loading_categories,
    get_products_filtered_page,
    store,
    cart
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const { storeSlug } = useParams();
    const query = useQuery();
    const name = query.get('name');
    const minPrice = query.get('minPrice');
    const maxPrice = query.get('maxPrice');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        get_products_filtered(storeSlug, name, minPrice, maxPrice)
        window.scrollTo(0, 0);
    }, [name, minPrice, maxPrice])




    return (
        <Layout>
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
                                                            <CategoriesStoreMobile categories={categories} loading_categories={loading_categories} storeSlug={storeSlug} closeCategories={() => setMobileFiltersOpen(false)} />
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className='m-4 '>
                                                    <SearchForm storeSlug={storeSlug} />

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
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-estilo_letra">
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-2 pt-10 ">
                    <div className="hidden sm:block">
                        {/* <Searcher className="flex-1" /> */}
                        <SearchProductosForm storeSlug={storeSlug} />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
                        <Link
                            to={`/store/${storeSlug}`}
                            className="flex items-center text-lg font-semibold text-gray-300 mb-2 sm:mb-0 mr-4 sm:mr-6 lg:mr-0"
                        >
                            {/* Agrega el icono de búsqueda */}
                            {count} Productos filtrados {name}

                        </Link>
                        <button
                            onClick={() => setOpen(true)}
                            className="relative text-white px-4 py-2 rounded-md hover:bg-azul_corp mx-2"
                        >
                            <ShoppingCartIcon className="h-8 w-8" />
                            <span className="absolute top-0 right-0 mt-1 mr-1 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-red-100 bg-red-600 rounded-full font-estilo_letra">
                                {cart && cart.items ? cart.items.length : 0}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="p-2 text-gray-200  bg-gray-600 rounded-md sm:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon className="h-5 w-5 " aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <div className="lg:col-span-1">
                            <div className="grid grid-cols-1 gap-y-10">
                                <div className="container mx-auto">
                                    <CategoriesStore categories={categories} loading_categories={loading_categories} storeSlug={storeSlug} />
                                </div>
                            </div>
                            <div className='pt-5 hidden lg:block'>
                                <SearchForm storeSlug={storeSlug} />

                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            {loading_products ? (
                                <LoadingStores />
                            ) : (
                                <>
                                    {products && products.length > 0 ? (
                                        <ProductListFiltered
                                            products={products}
                                            get_products_filtered_page={get_products_filtered_page}
                                            storeSlug={storeSlug}
                                            name={name}
                                            minPrice={minPrice}
                                            maxPrice={maxPrice}
                                            count={count}
                                        />
                                    ) : (
                                        <div className="bg-gray-800 text-gray-200 rounded-md p-4">
                                            <p className="text-center text-gray-300 mb-2">No hay productos para esta busqueda.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <CartProductStore open={open} setOpen={setOpen} storeSlug={storeSlug} />

            <FooterStores store={store} />

        </Layout>
    )
}
const mapStateToProps = state => ({
    store: state.Stores.store,

    products: state.Products.products,
    count: state.Products.count,
    next: state.Products.next,
    previous: state.Products.previous,
    loading_products: state.Products.loading_products,
    loading_categories: state.Store_Categories_Products.loading_category_products,
    categories: state.Store_Categories_Products.categories,
    cart: state.Cart.cart,

})

export default connect(mapStateToProps, {
    get_products_filtered,
    get_products_filtered_page
})(ProductsFiltered)