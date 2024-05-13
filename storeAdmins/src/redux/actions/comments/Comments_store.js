import axios from 'axios';
import {
    GET_COMMENT_STORE_SUCCESS,
    GET_COMMENT_STORE_FAIL,

} from './types';
import { SET_LOADED_STORE, REMOVE_LOADED_STORE } from '../store/types';


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_store_comments = (SlugStore) => async dispatch => {
    dispatch({
        type: SET_LOADED_STORE
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/coments_store/${SlugStore}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COMMENT_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COMMENT_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADED_STORE
        });
    } catch (err) {
        dispatch({
            type: GET_COMMENT_STORE_FAIL
        });
        dispatch({
            type: REMOVE_LOADED_STORE
        });
    }
}
