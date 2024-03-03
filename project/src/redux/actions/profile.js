import axios from "axios";
import { setAlert } from './alert';

import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    GET_USER_LOCATION_SUCCESS,
    GET_USER_LOCATION_FAIL,
    UPDATE_USER_LOCATION_SUCCESS,
    UPDATE_USER_LOCATION_FAIL
} from "./types";

const exito = '#00B906';
const error = '#bb2929';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_user_profile = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${apiUrl}/api/profile/user`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_USER_PROFILE_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_USER_PROFILE_FAIL
            });
        }
    }
}

export const update_user_profile = (
    firs_name,
    last_name,
    phone,
    identification,
) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({
            firs_name,
            last_name,
            phone,
            identification,
        });
        try {
            const res = await axios.put(`${apiUrl}/api/profile/update`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Datos guardados correctamente.', exito));
            } else {
                dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                });
                dispatch(
                    setAlert('Fallo al guardar perfil', error));
            }
        } catch(err) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
            dispatch(
                setAlert('Fallo al guardar perfil', error));
        }
    }
}

export const get_user_location = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${apiUrl}/api/profile/user_location`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_USER_LOCATION_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_USER_LOCATION_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_USER_LOCATION_FAIL
            });
        }
    }
}

export const update_user_location = (
    address_line_1,
    address_line_2,
    city,
    postal_zip_code,
    delivery_notes,
) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({
            address_line_1,
            address_line_2,
            city,
            postal_zip_code,
            delivery_notes,
        });

        console.log(body)

        try {
            const res = await axios.put(`${apiUrl}/api/profile/update_user_location`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_USER_LOCATION_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Perfil guardado correctamente, puedes comprar o crear tu tienda o servicio.', exito));
            } else {
                dispatch({
                    type: UPDATE_USER_LOCATION_FAIL
                });
                dispatch(
                    setAlert('Fallo al guardar perfil', error));
            }
        } catch(err) {
            dispatch({
                type: UPDATE_USER_LOCATION_FAIL
            });
            dispatch(
                setAlert('Fallo al guardar perfil', error));
        }
    }
}
