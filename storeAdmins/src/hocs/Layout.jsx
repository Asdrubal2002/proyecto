
//import Alerta from '../components/alert/Alerta';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/navigation/Sidebar';

import { load_user, check_authenticated, refresh, logout } from '../redux/actions/auth/auth';

import { Navigate } from 'react-router-dom';
import { get_user_profile } from '../redux/actions/profile/profile';


function Layout({
    children,
    check_authenticated,
    load_user,
    refresh,
    isAuthenticated,
    logout,
    get_user_profile,
    profile,
    user
}) {

    if (!isAuthenticated)
        return <Navigate to='/' />;

    useEffect(() => {
        get_user_profile()
        isAuthenticated ? <></> :
            <>
                {check_authenticated()}
                {load_user()}
                {refresh()}

            </>
    }, [])

    return (
        <div>
            <Sidebar children={children} logout={logout} profile={profile} user={user}/>
        </div>
    )
}


const mapStateToProps = state => ({
    user_loading: state.Auth.loading,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    profile: state.Profile.profile
})

export default connect(mapStateToProps, {
    check_authenticated,
    load_user,
    refresh,
    logout,
    get_user_profile
})(Layout)