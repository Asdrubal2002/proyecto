import axios from 'axios';
import {
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    SET_WISHLIST_LOADED,
    REMOVE_WISHLIST_LOADED,
    ADD_WISHLIST_SUCCESS,
    ADD_WISHLIST_FAIL,
    REMOVE_WISHLIST_SUCCESS
} from './types';
import { setAlert } from './alert';

const exito = '#00B906';

const error = '#bb2929';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const get_user_wish_list = () => async dispatch => {
    dispatch({
        type: SET_WISHLIST_LOADED,
    });
    try {
        const accessToken = localStorage.getItem('access');

        if (!accessToken) {
            // Si no hay token de acceso, puedes manejar la situación de no autenticación aquí
            dispatch({
                type: GET_WISHLIST_FAIL,
            });
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${accessToken}`,
            }
        };

        const res = await axios.get(`${apiUrl}/api/wishlist/user_wish_list`, config);

        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: REMOVE_WISHLIST_LOADED,
        });

    } catch (err) {
        dispatch({
            type: GET_WISHLIST_FAIL,
        });
        dispatch({
            type: REMOVE_WISHLIST_LOADED,
        });
    }
};


export const add_to_wish_list = (productSlug) => async dispatch => {
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
        const product_slug = productSlug;
        const body = JSON.stringify({ product_slug });

        const res = await axios.post(`${apiUrl}/api/wishlist/add-to-wishlist/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 201) {
            dispatch({
                type: ADD_WISHLIST_SUCCESS,
                payload: res.data,
            });
            dispatch(
                setAlert(
                    "Añadido a tu productos guardados",
                    exito
                )
            );
        } else if (res.status === 200) {
            dispatch({
                type: REMOVE_WISHLIST_SUCCESS,
                payload: res.data,
            });
            dispatch(
                setAlert(
                    "Eliminado de tus productos guardados",
                    exito
                )
            );
        } else {
            dispatch({
                type: ADD_WISHLIST_FAIL
            });
            setAlert(
                "Error al Añadir a tu productos guardados",
                exito
            )
        }
    } catch (error) {
        console.error("Error al agregar el wishlist al carrito:", error);

        // Manejar el error de autorización específicamente
        if (error.response && error.response.status === 401) {
            // Puedes realizar acciones específicas para manejar la falta de autorización aquí
            // Por ejemplo, redireccionar a la página de inicio de sesión
            // O mostrar un mensaje de error al usuario
            // ...
        }
    } finally {
        // Cerrar la conexión de manera controlada si es necesario
        console.log("Proceso finalizado, conexión cerrada");
    }



}
