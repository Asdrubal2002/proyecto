import axios from 'axios';

import { CREATE_STORE_SUCCESS, CREATE_STORE_FAIL, SET_LOADED_STORE, REMOVE_LOADED_STORE } from './types';

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
    console.log("llega aqui")
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
            } else {
                dispatch({
                    type: CREATE_STORE_FAIL
                });
                dispatch(
                    setAlert('Fallo al crear tienda', error));
            }
            dispatch({
                type: REMOVE_LOADED_STORE,
            });
        } catch (err) {
            dispatch({
                type: CREATE_STORE_FAIL
            });
            dispatch(
                setAlert('Fallo al crear tienda', error));
            dispatch({
                type: REMOVE_LOADED_STORE,
            });
        }

    }
}