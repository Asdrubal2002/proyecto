import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_products, get_products_list_page } from '../../redux/actions/products/products'

import ProductList from '../../components/products/ProductList'

import { Rings } from "react-loader-spinner";


function Products({
  get_products,
  get_products_list_page,
  products,
  loading_products,
  count
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
    get_products()
  }, []);


  return (
    <Layout>

      {loading_products ? 
        <Rings width={30} height={30} color="#fff" radius="6" />
        :
        <ProductList products={products} get_products_list_page={get_products_list_page} count={count} />
      }
    </Layout>

  )
}

const mapStateToProps = state => ({
  products: state.Products.products,
  loading_products: state.Products.loading_products,
  count: state.Products.count,
  next: state.Products.next,
  previous: state.Products.previous,
})

export default connect(mapStateToProps, {
  get_products,
  get_products_list_page
})(Products)
