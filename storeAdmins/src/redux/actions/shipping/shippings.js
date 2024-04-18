import axios from 'axios';
import {
    GET_SHIPPINGS_SUCCESS, 
    GET_SHIPPINGS_FAIL,
    SET_SHIPPINGS_LOADING,
    REMOVE_SHIPPINGS_LOADING
} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const get_shippings = () => async dispatch => {
    dispatch({
        type: SET_SHIPPINGS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/shipping/shipping-options-store/`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SHIPPINGS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SHIPPINGS_FAIL
            });
        }
        dispatch({
            type: REMOVE_SHIPPINGS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_SHIPPINGS_FAIL
        });
        dispatch({
            type: REMOVE_SHIPPINGS_LOADING
        });
    }
}