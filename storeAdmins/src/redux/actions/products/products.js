import axios from 'axios';

import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, SET_PRODUCTS_LOADING, REMOVE_PRODUCTS_LOADING } from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const get_products = () => async dispatch => {
    dispatch({
        type:SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json', 
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/user-products/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}

export const get_products_list_page = (page) => async dispatch => {
    dispatch({
        type:SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    console.log(page)

    try {
        const res = await axios.get(`${apiUrl}/api/product/user-products/?p=${page}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}