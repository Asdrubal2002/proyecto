import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { get_user_store } from '../../redux/actions/store/store';
import Create from '../store/Create';
import { get_invoices_admin, get_status } from '../../redux/actions/invoices/invoices';
import ListInvoices from './ListInvoices';



function Invoices({
    get_user_store,
    userStore,
    get_invoices_admin,
    get_status
}) {

    useEffect(() => {
        get_user_store()
        get_invoices_admin()
        get_status()
    }, []);

    return (
        <Layout>
            {
                userStore ? (
                    <>
                       <ListInvoices/>
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
   get_invoices_admin,
   get_status
})(Invoices)
