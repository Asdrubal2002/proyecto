import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { get_user_store } from '../../redux/actions/store/store';
import Create from '../store/Create';
import { get_partners } from '../../redux/actions/users-store/users';
import FormPartners from './FormPartners';


function Partner({
    get_user_store,
    userStore,
    get_partners
}) {

    useEffect(() => {
        get_user_store()
        get_partners()
       
    }, []);

    return (
        <Layout>
            {
                userStore ? (
                    <>
                       <FormPartners get_partners={get_partners}/>
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
    get_partners
})(Partner)
