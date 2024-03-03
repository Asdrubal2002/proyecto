
//import Alerta from '../components/alert/Alerta';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/navigation/Sidebar';


//import { check_authenticated, load_user, refresh } from '../redux/actions/auth';

function Layout({children}) {
    return (
        <div>
            <Sidebar children={children}/>
             
            
        </div>
    )
}

export default connect(null, {
   
})(Layout)