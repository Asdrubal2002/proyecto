import axios from 'axios';
import {
    GET_SHIPPINGS_SUCCESS,
    GET_SHIPPINGS_FAIL,
    SET_SHIPPINGS_LOADING,
    REMOVE_SHIPPINGS_LOADING,
    ADD_SHIPPINGS_SUCCESS,
    ADD_SHIPPINGS_FAIL,
    DELETE_SHIPPING_SUCCESS,
    DELETE_SHIPPING_FAIL,
    CHANGE_STATUS_SHIPPING_SUCCESS,
    CHANGE_STATUS_SHIPPING_FAIL,
    UPDATE_SHIPPING_SUCCESS,
    UPDATE_SHIPPING_FAIL
} from './types';
import { setAlert } from '../alert/alert';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const exito = '#00B906';
const error = '#bb2929';

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


export const create_shippings = (
    name, time_to_delivery, price, additional_notes
) => async dispatch => {
    dispatch({
        type: SET_SHIPPINGS_LOADING,
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
            name, time_to_delivery, price, additional_notes
        });
        try {
            const res = await axios.post(`${apiUrl}/api/shipping/add_shipping-options-store/`, body, config);

            if (res.status === 201) {
                dispatch({
                    type: ADD_SHIPPINGS_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Método creado correctamente.', exito));
            } else if (res.status === 400) {
                dispatch({
                    type: ADD_SHIPPINGS_FAIL
                });
                dispatch(setAlert("Error en el servidor.", error));
            }
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        } catch (err) {
            dispatch({
                type: ADD_SHIPPINGS_FAIL
            });
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        }

    }
}




export const delete_shipping = (
    id
) => async dispatch => {
    dispatch({
        type: SET_SHIPPINGS_LOADING,
    });
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.delete(`${apiUrl}/api/shipping/delete_shipping/${id}/`, config);

            if (res.status === 200) {
                dispatch({
                    type: DELETE_SHIPPING_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Método eliminado correctamente.', exito));
            }
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        } catch (err) {
            dispatch({
                type: DELETE_SHIPPING_FAIL
            });
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        }

    }
}


export const change_status_shipping = (
    id
) => async dispatch => {
    dispatch({
        type: SET_SHIPPINGS_LOADING,
    });
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        const shipping_id = id;
        const body = JSON.stringify({
            shipping_id
        });
        console.log(body)
        try {
            const res = await axios.put(`${apiUrl}/api/shipping/estado_shipping/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: CHANGE_STATUS_SHIPPING_SUCCESS,
                    payload: res.data
                });

                dispatch(
                    setAlert('Haz cambiado el estado de tu Método correctamente.', exito));
            }
            get_categories()
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        } catch (err) {
            dispatch({
                type: CHANGE_STATUS_SHIPPING_FAIL
            });
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        }

    }
}


export const update_shipping = (
    id, name, time_to_delivery, price, additional_notes
) => async dispatch => {
    dispatch({
        type: SET_SHIPPINGS_LOADING,
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
            id, name, time_to_delivery, price, additional_notes
        });
        try {
            const res = await axios.put(`${apiUrl}/api/shipping/update_shippings/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_SHIPPING_SUCCESS,
                    payload: res.data
                });
                dispatch(
                    setAlert('Método actualizado correctamente.', exito));
            } else if (res.status === 400) {
                dispatch({
                    type: UPDATE_SHIPPING_FAIL
                });
                dispatch(setAlert("Error en el servidor.", error));
            }
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        } catch (err) {
            dispatch({
                type: UPDATE_SHIPPING_FAIL
            });
            dispatch({
                type: REMOVE_SHIPPINGS_LOADING,
            });
        }

    }
}
