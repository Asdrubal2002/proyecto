import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/navigation/Navbar';
import Alerta from '../components/alert/Alerta';

import { get_user_profile } from '../redux/actions/profile';
import { get_user_carts } from '../redux/actions/cart';
import { useEffect } from 'react';
import { connect } from 'react-redux';


import { check_authenticated, load_user, refresh } from '../redux/actions/auth';

const Layout = (props) => {

    useEffect(() => {
        props.refresh();
        props.check_authenticated();
        props.load_user();
        props.get_user_profile();
        props.get_user_carts()
    }, []);

    return (
        <div>
            <Navbar />
            <div className="absolute z-[100]">
                <Alerta />
            </div>
            <ToastContainer autoClose={5000} />
            {props.children}
            
        </div>
    )
}

export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
    get_user_profile,
    get_user_carts,
})(Layout)