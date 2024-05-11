import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_products, get_products_list_page } from '../../redux/actions/products/products'

import ProductList from '../../components/products/ProductList'

import { Rings } from "react-loader-spinner";
import Create from '../store/Create'
import { get_user_store } from '../../redux/actions/store/store'

import { get_categories } from '../../redux/actions/categories_product/categories_product'
import { Link } from 'react-router-dom'
import CreateProduct from '../../components/products/CreateProduct'
import CategoriesAdminProducts from '../../components/products/CategoriesAdminProducts'


function Products({
  get_products,
  get_products_list_page,
  products,
  loading_products,
  count,
  userStore,
  categories,
  get_user_store,
  get_categories,
}) {

  useEffect(() => {
    get_user_store()
    get_products()
    get_categories()
  }, []);



  return (
    <>
      <Layout>
        {userStore ? (
          <>
            {products && products.length > 0 ? (
              <>
                <CreateProduct />
                <div className='flex items-center '>
                  <CategoriesAdminProducts categories={categories} userStore={userStore} />
                </div>
                {
                  loading_products ? (
                    <Rings width={30} height={30} color="#fff" radius="6" />
                  ) :
                    <>
                      <ProductList products={products} get_products_list_page={get_products_list_page} count={count} />
                    </>
                }
              </>
            ) : (
              <CreateProduct />
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
  products: state.Products.products,
  loading_products: state.Products.loading_products,
  count: state.Products.count,
  next: state.Products.next,
  previous: state.Products.previous,
  userStore: state.Store.store,
  categories: state.Product_category.categories
})

export default connect(mapStateToProps, {
  get_products,
  get_products_list_page,
  get_user_store,
  get_categories
})(Products)
