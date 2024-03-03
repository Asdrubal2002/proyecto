import axios from 'axios';

import {

    GET_SHIPPING_OPTION_SUCCESS,
    GET_SHIPPING_OPTION_FAIL

} from "./types";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


// Acción para obtener el carrito del usuario
export const get_shippings = (cartSlug) => async dispatch => {

    try {
        const accessToken = localStorage.getItem('access');

        if (!accessToken) {
            throw new Error('No hay token de acceso disponible');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${accessToken}`,
            }
        };

        const res = await axios.get(`${apiUrl}/api/shipping/shipping-options/${cartSlug}`,config);

        dispatch({
            type: GET_SHIPPING_OPTION_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_SHIPPING_OPTION_FAIL,
        });
    }
};