import axios from 'axios';

import {
    USERS_STORE_SUCCESS,
    USERS_STORE_FAIL,
    SET_LOADING_STORE_USERS,
    REMOVE_LOADING_STORE_USERS,

} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const exito = '#00B906';
const error = '#bb2929';

import { setAlert } from '../alert/alert';


export const get_partners = () => async dispatch => {
    dispatch({
        type: SET_LOADING_STORE_USERS
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/store/store-partners/`, config);
        if (res.status === 200) {
            dispatch({
                type: USERS_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: USERS_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_STORE_USERS
        });
    } catch (err) {
        dispatch({
            type: USERS_STORE_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_STORE_USERS
        });
    }
}

