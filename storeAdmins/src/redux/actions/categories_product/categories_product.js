import axios from 'axios';

import {
    GET_CATEGORIES_SUCCESS, 
    GET_CATEGORIES_FAIL, 
    SET_CATEGORY_LOADING,
    REMOVE_CATEGORY_LOADING, 
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL
} from './types';
import { setAlert } from '../alert/alert';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const exito = '#00B906';
const error = '#bb2929';

export const get_categories = () => async dispatch => {
    dispatch({
        type: SET_CATEGORY_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/product_category/categories_products/`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            });
        }
        dispatch({
            type: REMOVE_CATEGORY_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        });
        dispatch({
            type: REMOVE_CATEGORY_LOADING
        });
    }
}


export const create_category = (
    name, slug, parent
) => async dispatch => {
    dispatch({
        type: SET_CATEGORY_LOADING,
    });
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({
            name, slug, parent
        });
        try {
            const res = await axios.post(`${apiUrl}/api/product_category/create_categories_products/`, body, config);

            if (res.status === 201) {
                dispatch({
                    type: CREATE_CATEGORY_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Categoria creada correctamente.', exito));
            }else if (res.status === 400) {
                dispatch({
                    type: CREATE_CATEGORY_FAIL
                });
                dispatch(setAlert("Error en el servidor.", error));
            }
            dispatch({
                type: REMOVE_CATEGORY_LOADING,
            });
        } catch (err) {
            dispatch({
                type: CREATE_CATEGORY_FAIL
            });
            dispatch({
                type: REMOVE_CATEGORY_LOADING,
            });
        }

    }
}
