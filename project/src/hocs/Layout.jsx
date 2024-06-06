import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/navigation/Navbar';
import Alerta from '../components/alert/Alerta';

import { get_user_profile } from '../redux/actions/profile';
import { get_count_user_carts } from '../redux/actions/cart';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_user_invoices_count } from '../redux/actions/Invoice';

const Layout = (props) => {

    useEffect(() => {
        if (!props.isAuthenticated) {
            props.refresh();
            props.check_authenticated();
            props.load_user();
        }
        props.get_user_profile();
        props.get_user_invoices_count();
        props.get_count_user_carts();
    }, [props.isAuthenticated]);

    return (
        <div>
            <Navbar />
            <div className="absolute z-[100]">
                <Alerta />
            </div>
            <ToastContainer autoClose={5000} />
            {props.children}
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    check_authenticated,
    load_user,
    refresh,
    get_user_profile,
    get_count_user_carts,
    get_user_invoices_count
})(Layout);
