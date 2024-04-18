import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home/Home'
import Errors404 from './containers/errors/Errors404'

import Create from './containers/store/Create'
import Administrator from './containers/Home/Administrator'
import Store from './containers/store/Store'

import Products from './containers/product/Products'

import Categories from './containers/categories/Categories'

import EditProduct from './containers/product/EditProduct'

import Shippings from './containers/shipping/Shippings'

function AnimatedRoutes() {
  return (

      <Routes>
              <Route exact path='*' element={<Errors404 />} />

              <Route exact path='/' element={<Home />} />

              <Route exact path='/store_admin_home' element={<Administrator />} />


              <Route exact path='/create_store' element={<Create />} />

              <Route exact path='/store' element={<Store />} />

              <Route exact path='/products' element={<Products />} />

              <Route exact path='/categories' element={<Categories />} />

              <Route exact path='/product/:slug' element={<EditProduct />} />

              <Route exact path='/shipping' element={<Shippings />} />




      </Routes>

  )
}

export default AnimatedRoutes