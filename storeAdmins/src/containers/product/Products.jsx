import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_products, get_products_list_page } from '../../redux/actions/products/products'

import ProductList from '../../components/products/ProductList'

import { Rings } from "react-loader-spinner";
import Create from '../store/Create'


function Products({
  get_products,
  get_products_list_page,
  products,
  loading_products,
  count,
  userStore
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
    get_products()
  }, []);


  return (
    <Layout>
      {userStore ? <>
        {loading_products ?
        <Rings width={30} height={30} color="#fff" radius="6" />
        :
        <>
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-200">¿Tienes otro producto nuevo?</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                 Crear producto
                </button>
              </div>
            </div>
          </div>
          <ProductList products={products} get_products_list_page={get_products_list_page} count={count} />
        </>
      }


      
      </> : <div className='m-4'>
            <Create />
          </div>}

      
    </Layout>

  )
}

const mapStateToProps = state => ({
  products: state.Products.products,
  loading_products: state.Products.loading_products,
  count: state.Products.count,
  next: state.Products.next,
  previous: state.Products.previous,
  userStore: state.Store.store

})

export default connect(mapStateToProps, {
  get_products,
  get_products_list_page
})(Products)
