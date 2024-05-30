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
import ProductsByCategory from './containers/product/ProductsByCategory'
import HelpWithMyStore from './containers/ayuda/HelpWithMyStore'
import Options_admin from './containers/options-products/Options_admin'
import HelpWithPhotos from './containers/ayuda/HelpWithPhotos'
import Invoices from './containers/invoices/Invoices'
import Partner from './containers/partners/Partner'
import InvoiceDetail from './containers/invoices/InvoiceDetail'




HelpWithPhotos


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

              <Route exact path='/products_by_category/:storeSlug/:categorySlug' element={<ProductsByCategory />} />

              <Route exact path='/help' element={<HelpWithMyStore />} />

              <Route exact path='/my_options' element={<Options_admin />} />

              <Route exact path='/help_with_photos' element={<HelpWithPhotos />} />

              <Route exact path='/help_with_photos' element={<HelpWithPhotos />} />

              <Route exact path='/invoices' element={<Invoices />} />

              <Route exact path='/partners' element={<Partner />} />

              <Route exact path='/invoice/:transaction_number' element={<InvoiceDetail />} />








      </Routes>

  )
}

export default AnimatedRoutes