import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { get_products_by_category, get_products_by_category_page } from '../../redux/actions/products';
import Layout from '../../hocs/Layout';
import { Link, useParams } from 'react-router-dom';
import ProductList from './ProductList';
import LoadingStores from '../home/LoadingStores';
import { BuildingStorefrontIcon, GiftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FunnelIcon } from '@heroicons/react/24/solid'

import { Dialog, Menu, Transition } from '@headlessui/react'
import { get_categories_products_store } from "../../redux/actions/product_categories";
import CategoriesStore from '../../containers/Store/CategoriesStore';
import CategoriesStoreMobile from '../../containers/Store/CategoriesStoreMobile';
import LoadingCategoriesStores from '../store/LoadingCategoriesStores';
import Searcher from '../searcher/Searcher';
import ProductListByCategory from './ProductsListByCategory';
import { GifIcon } from '@heroicons/react/24/solid';
import SearchFormByCategory from '../searcher/SearchFormByCategory';



const ProductsByCategory = ({
  store,
  get_products_by_category,
  get_products_by_category_page,
  products,
  count,
  next,
  previous,
  loading_products,
  loading_categories,
  get_categories_products_store,
  categories,
}) => {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)


  const params = useParams();
  const storeSlug = params.storeSlug;
  const categorySlug = params.categorySlug;

  useEffect(() => {
    get_products_by_category(storeSlug, categorySlug);
    window.scrollTo(0, 0);
  }, [storeSlug, categorySlug]);

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        <>
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
                            <div className='m-4'>
                              <SearchFormByCategory storeSlug={storeSlug} categorySlug={categorySlug} />
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
                  <GiftIcon className="h-6 w-6 mr-2 text-gray-600" aria-hidden="true" />
                  {/* Agrega el icono de búsqueda */}
                  {count} Productos - 
                  <strong>
                    {' '}
                    {categorySlug
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </strong>
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
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <div className="lg:col-span-1">
                  <div className="grid grid-cols-1 gap-y-10">
                    <div className="container mx-auto">
                      <CategoriesStore categories={categories} loading_categories={loading_categories} storeSlug={storeSlug} />
                    </div>
                  </div>
                  <div className='pt-5 hidden lg:block'>
                    <SearchFormByCategory storeSlug={storeSlug} categorySlug={categorySlug} />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  {loading_products ? (
                    <LoadingStores />
                  ) : (
                    <>
                      {products && products.length > 0 ? (
                        <ProductListByCategory
                          products={products}
                          get_products_list_page={get_products_by_category_page}
                          storeSlug={storeSlug}
                          categorySlug={categorySlug}
                          count={count}
                        />
                      ) : (
                        <div className="bg-gray-800 text-gray-200 rounded-md p-4">
                          <p className="text-center text-gray-300 mb-2">No hay productos para esta categoria.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

              </div>
            </section>
          </main>
        </>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  store: state.Stores.store,

  products: state.Products_By_Category.products,
  count: state.Products_By_Category.count,
  next: state.Products_By_Category.next,
  previous: state.Products_By_Category.previous,
  loading_products: state.Products_By_Category.loading_products_by_category,
  loading_categories: state.Store_Categories_Products.loading_category_products,
  categories: state.Store_Categories_Products.categories,

});

export default connect(mapStateToProps, {
  get_products_by_category,
  get_products_by_category_page
})(ProductsByCategory);
