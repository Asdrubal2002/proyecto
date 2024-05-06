import axios from 'axios';

import {
    CREATE_STORE_SUCCESS,
    CREATE_STORE_FAIL,

    GET_STORE_SUCCESS,
    GET_STORE_FAIL,

    SET_LOADED_STORE,
    REMOVE_LOADED_STORE,

    CREATE_STORE_POLICIES_SUCCESS,
    CREATE_STORE_POLICIES_FAIL,

    GET_STORE_POLICIES_SUCCESS,
    GET_STORE_POLICIES_FAIL,

    SET_LOADING_STORE_POLICIES_SUCCESS,
    REMOVE_LOADING_GET_STORE_POLICIES_FAIL

} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const exito = '#00B906';
const error = '#bb2929';

import { setAlert } from '../alert/alert';

export const createStore = (
    name,
    category,
    description,
    location,
    address,
    phone,
    email,
    schedule,
    nit,
    url_pay,
    account_pay,
    slug,
    city
) => async dispatch => {
    dispatch({
        type: SET_LOADED_STORE,
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
            name,
            category,
            description,
            location,
            address,
            phone,
            email,
            schedule,
            nit,
            url_pay,
            account_pay,
            slug,
            city

        });
        try {
            const res = await axios.post(`${apiUrl}/api/store/create-store/`, body, config);

            if (res.status === 201) {
                dispatch({
                    type: CREATE_STORE_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Tienda creada correctamente.', exito));
            } else if (res.status === 400) {
                dispatch({
                    type: GET_STORE_FAIL
                });
                dispatch(setAlert("Lo sentimos, ya existe una tienda con esa dirección.", error));
            }
            dispatch({
                type: REMOVE_LOADED_STORE,
            });
        } catch (err) {
            dispatch({
                type: CREATE_STORE_FAIL
            });
            dispatch(
                setAlert("Lo sentimos, parece que ya existe una tienda con esta dirección. Por favor, intenta con una dirección diferente.", error));
            dispatch({
                type: REMOVE_LOADED_STORE,
            });
        }

    }
}


export const get_user_store = () => async dispatch => {
    dispatch({
        type: SET_LOADED_STORE
    });
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${apiUrl}/api/store/user-store/`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_STORE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_STORE_FAIL
                });
            }
            dispatch({
                type: REMOVE_LOADED_STORE
            });
        } catch (err) {
            dispatch({
                type: GET_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADED_STORE
        });
    }
}


export const create_policy = (
    name, policy_text
) => async dispatch => {
    dispatch({
        type: SET_LOADED_STORE,
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
            name, policy_text
        });
        try {
            const res = await axios.post(`${apiUrl}/api/store/policies-create/`, body, config);

            if (res.status === 201) {
                dispatch({
                    type: CREATE_STORE_POLICIES_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Política creada correctamente.', exito));
            } else if (res.status === 400) {

                dispatch(setAlert("Lo sentimos", error));
            }
            dispatch({
                type: REMOVE_LOADED_STORE,
            });
        } catch (err) {
            dispatch({
                type: CREATE_STORE_POLICIES_FAIL
            });
            dispatch(
                setAlert("Lo sentimos", error));
            dispatch({
                type: REMOVE_LOADED_STORE,
            });
        }

    }
}

export const get_store_policies = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_LOADING_STORE_POLICIES_SUCCESS
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/policies/${storeSlug}/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_POLICIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_POLICIES_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_GET_STORE_POLICIES_FAIL
        });
    } catch (err) {
        dispatch({
            type: GET_STORE_POLICIES_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_GET_STORE_POLICIES_FAIL
        });
    }
}