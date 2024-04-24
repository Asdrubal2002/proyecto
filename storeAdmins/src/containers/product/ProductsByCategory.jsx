import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_products, get_products_by_category, get_products_by_category_page, get_products_list_page } from '../../redux/actions/products/products'

import { Dialog, Transition, Disclosure } from '@headlessui/react'

import { Rings } from "react-loader-spinner";
import Create from '../store/Create'
import axios from "axios"
import { get_user_store } from '../../redux/actions/store/store'

import FormCategories from '../categories/FormCategories'
import { PencilSquareIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { get_categories } from '../../redux/actions/categories_product/categories_product'
import { Link, useParams } from 'react-router-dom'
import CreateProduct from '../../components/products/CreateProduct'
import CategoriesAdminProducts from '../../components/products/CategoriesAdminProducts'
import ProductListCategories from '../../components/products/ProductListCategories'


function ProductsByCategory({
  get_products,
  get_products_list_page,
  products,
  loading_products,
  count,
  userStore,
  categories,
  get_user_store,
  get_categories,
  get_products_by_category,
  get_products_by_category_page

}) {

  const params = useParams();
  const storeSlug = params.storeSlug;
  const categorySlug = params.categorySlug;

  useEffect(() => {
    window.scrollTo(0, 0)
    get_user_store()
    get_products()
    get_categories()
    get_products_by_category(storeSlug, categorySlug);

  }, [storeSlug, categorySlug]);



  return (
    <>
      <Layout>
        {userStore ? (
          <>
            <CreateProduct />
            <div className='flex items-center '>
              <CategoriesAdminProducts categories={categories} userStore={userStore} />
            </div>
            {loading_products ? (
              <Rings width={30} height={30} color="#fff" radius="6" />
            ) : (
              <>
                {
                  products && products.length > 0 ? (<ProductListCategories products={products} get_products_list_page={get_products_by_category_page} storeSlug={userStore.slug} categorySlug={categorySlug} count={count} />
                  ) : (
                  <div className="bg-gray-800 text-gray-200 rounded-md p-2 mt-4">
                    <p className="text-center text-gray-300 mb-2 text-sm">No hay productos para esta categoria.</p>
                  </div>
                  )
                }

              </>
            )}
          </>
        ) : (
          <div className='m-4'>
            <Create />
          </div>
        )}
      </Layout>



    </>
  )
}

const mapStateToProps = state => ({
  products: state.Products_ByCategory.products,
  loading_products: state.Products.loading_products,
  count: state.Products_ByCategory.count,
  next: state.Products_ByCategory.next,
  previous: state.Products_ByCategory.previous,
  userStore: state.Store.store,
  categories: state.Product_category.categories
})

export default connect(mapStateToProps, {
  get_products,
  get_products_list_page,
  get_user_store,
  get_categories,
  get_products_by_category,
  get_products_by_category_page
})(ProductsByCategory)
