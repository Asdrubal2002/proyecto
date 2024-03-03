import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Error404 from './containers/Errors/Error404.jsx';
import Home from './containers/Home/Home.jsx';
{/* Authentication */ }
import SignIn from './containers/auth/SignIn.jsx';
import SignUp from './containers/auth/SignUp.jsx';
import Activate from './containers/auth/Activate.jsx';
import Reset_password from './containers/auth/Reset_password.jsx';
import Reset_password_new from './containers/auth/Reset_password_new.jsx';

import Conditions from './containers/Home/Conditions.jsx';

import Dashboard from './containers/Profile/Dashboard.jsx';

import Mall from './containers/Home/Mall.jsx';
import StoreDetail from './containers/Store/StoreDetail.jsx';
import ProductsByCategory from './components/product/ProductsByCategory.jsx';
import Cart from './containers/Cart/Cart.jsx';
import Products from './containers/Cart/Products.jsx';
import WishList from './containers/Profile/WishList.jsx';
import WishListStore from './containers/Profile/wishListStore.jsx';
import About from './containers/Home/About.jsx';

import Invoices from './containers/Invoice/Invoices.jsx';

import CreateStore from './containers/Store/CreateStore.jsx';
import ProductDetail from './components/product/ProductDetail.jsx';



function AnimatedRoutes() {
  return (

      <Routes>
        <Route path="*" element={<Error404 />} />

        <Route exact path='/' element={<Home />} />

        {/* Authentication */}
        <Route exact path='/login' element={<SignIn />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path="/activate/:uid/:token" element={<Activate />} />
        <Route exact path='/reset_password' element={<Reset_password />} />
        <Route path='/password/reset/confirm/:uid/:token' element={<Reset_password_new />} />
        <Route exact path='/conditions' element={<Conditions />} />
        <Route exact path='/company' element={<About />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route path="/search/:slug/:search/" element={<Mall />}/>
        <Route exact path='/store/:storeSlug' element={<StoreDetail />} />
        <Route exact path='/products_by_category/:storeSlug/:categorySlug' element={<ProductsByCategory />} />
        <Route exact path='/:slugProduct/detail' element={<ProductDetail/>} />
        <Route exact path='/carts' element={<Cart />} />
        <Route exact path='/:cart_slug/products' element={<Products />} />
        <Route exact path='/wish_list' element={<WishList />} />
        <Route exact path='/wish_list_stores' element={<WishListStore />} />
        <Route exact path='/invoices' element={<Invoices />} />




        <Route exact path='/create_store' element={<CreateStore />} />

      </Routes>

  )
}

export default AnimatedRoutes