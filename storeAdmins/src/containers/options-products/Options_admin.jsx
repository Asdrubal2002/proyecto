import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { get_user_store } from '../../redux/actions/store/store';
import Create from '../store/Create';
import CreateOptions from './CreateOptions';
import { get_options_admin } from '../../redux/actions/products/products';


function Options_admin({
    get_user_store,
    userStore,
    get_options_admin
}) {

    useEffect(() => {
        get_user_store()
        get_options_admin()
    }, []);

    return (
        <Layout>
            {
                userStore ? (
                    <>
                        <CreateOptions/>
                    </>
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
    userStore: state.Store.store,
})

export default connect(mapStateToProps, {
    get_user_store,
    get_options_admin
})(Options_admin)
