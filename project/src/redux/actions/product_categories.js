import axios from 'axios';

import { GET_PRODUCTS_LIST_CATEGORIES_STORE_SUCCESS, GET_PRODUCTS_LIST_CATEGORIES_STORE_FAIL,SET_CATEGORY_PRODUCT_LOADING, REMOVE_CATEGORY_PRODUCT_LOADING } from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const get_categories_products_store = (storeSlug) => async dispatch => {
    dispatch({
        type:SET_CATEGORY_PRODUCT_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/product_category/categories_store/${storeSlug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_LIST_CATEGORIES_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_LIST_CATEGORIES_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_CATEGORY_PRODUCT_LOADING
        });
    } catch(err) {
        dispatch({
            type: GET_PRODUCTS_LIST_CATEGORIES_STORE_FAIL
        });
        dispatch({
            type: REMOVE_CATEGORY_PRODUCT_LOADING
        });
    }
}
