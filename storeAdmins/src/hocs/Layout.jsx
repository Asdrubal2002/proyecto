
//import Alerta from '../components/alert/Alerta';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/navigation/Sidebar';

import { load_user, check_authenticated, refresh, logout } from '../redux/actions/auth/auth';
import { Navigate } from 'react-router-dom';


function Layout({
    children,
    check_authenticated,
    load_user,
    refresh,
    isAuthenticated,
    logout
}) {

    if (!isAuthenticated)
    return <Navigate to='/' />;

    useEffect(() => {
        isAuthenticated ?  <></>:
    <>
      {check_authenticated()}
      {load_user()}
      {refresh()}
    </>    
    }, [])

    return (
        <div>
            <Sidebar children={children} logout={logout} />
        </div>
    )
}


const mapStateToProps = state => ({
    user_loading: state.Auth.loading,
    isAuthenticated: state.Auth.isAuthenticated,
    user:state.Auth.user
})

export default connect(mapStateToProps, {
    check_authenticated,
    load_user,
    refresh,
    logout
})(Layout)