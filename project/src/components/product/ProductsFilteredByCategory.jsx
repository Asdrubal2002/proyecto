import Layout from "../../hocs/Layout";
import React, { useEffect, useRef, useState, Fragment } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { get_products_filtered_category, get_products_filtered_category_page } from "../../redux/actions/products";
import Searcher from "../searcher/Searcher";
import { FunnelIcon, GiftIcon } from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from '@headlessui/react'
import CategoriesStoreMobile from "../../containers/Store/CategoriesStoreMobile";
import CategoriesStore from "../../containers/Store/CategoriesStore";
import LoadingStores from "../home/LoadingStores";
import FooterStores from "../store/FooterStores";
import LoadingCategoriesStores from "../store/LoadingCategoriesStores";
import ProductListFilteredByCategory from "./ProductListFilteredByCategory";
import SearchFormByCategory from "../searcher/SearchFormByCategory";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ProductsFilteredByCategory = ({
    get_products_filtered_category,
    get_products_filtered_category_page,
    products,
    count,
    next,
    previous,
    loading_products,
    categories,
    loading_categories,
    store
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const { storeSlug } = useParams();
    const { categorySlug } = useParams();
    const query = useQuery();
    const name = query.get('name');
    const minPrice = query.get('minPrice');
    const maxPrice = query.get('maxPrice');

    useEffect(() => {
        get_products_filtered_category(storeSlug, categorySlug, name, minPrice, maxPrice)
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
                <div className="flex flex-col sm:flex-row  justify-between border-b border-gray-200 pb-6 pt-10">
                    <div className="hidden sm:block">
                        <Searcher className="flex-1" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
                        <Link
                            to={`/store/${storeSlug}`}
                            className="flex items-center text-lg font-semibold text-gray-300 mb-2 sm:mb-0 mr-4 sm:mr-6 lg:mr-0"
                        >
                            {/* Agrega el icono de búsqueda */}
                            {count} Productos filtrados

                        </Link>
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
                                <SearchFormByCategory storeSlug={storeSlug}  categorySlug={categorySlug}/>
                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            {loading_products ? (
                                <LoadingStores />
                            ) : (
                                <>
                                    {products && products.length > 0 ? (
                                        <ProductListFilteredByCategory
                                            products={products}
                                            get_products_filtered_category_page={get_products_filtered_category_page}
                                            storeSlug={storeSlug}
                                            categorySlug={categorySlug}
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
})

export default connect(mapStateToProps, {
    get_products_filtered_category,
    get_products_filtered_category_page
})(ProductsFilteredByCategory)