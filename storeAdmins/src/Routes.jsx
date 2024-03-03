import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home/Home'
import Errors404 from './containers/errors/Errors404'

import Create from './containers/store/Create'
import Administrator from './containers/Home/Administrator'
function AnimatedRoutes() {
  return (

      <Routes>
              <Route exact path='*' element={<Errors404 />} />

              <Route exact path='/' element={<Home />} />

              <Route exact path='/store_admin_home' element={<Administrator />} />


              <Route exact path='/create_store' element={<Create />} />

        




      </Routes>

  )
}

export default AnimatedRoutes