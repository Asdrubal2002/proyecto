import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { get_user_store } from '../../redux/actions/store/store';
import Create from '../store/Create';
import FormCategories from './FormCategories';


function Categories({
  get_user_store,
  userStore,
}) {

  useEffect(() => {
    get_user_store()
  }, []);

  return (
    <Layout>
      {
        userStore ? (
         <FormCategories/>
        ) : (
          <div className='m-4'>
            <Create />
          </div>
        )
      }
    </Layout>
  )
}

const mapStateToProps = state => ({
  userStore: state.Store.store

})

export default connect(mapStateToProps, {
  get_user_store,
})(Categories)
