// actions.js

import axios from 'axios';
import {

    USER_CARTS_SUCCESS,
    USER_CARTS_FAIL,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAIL,
    SET_ADD_ITEM_LOADED,
    REMOVE_ADD_ITEM_LOADED,
    INCREMENT_ITEM_SUCCESS,
    INCREMENT_ITEM_FAIL,
    DECREMENT_ITEM_SUCCESS,
    DECREMENT_ITEM_FAIL,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAIL,
    REMOVE_CART_SUCCESS,
    REMOVE_CART_FAIL,
    SYNCH_CART_SUCCESS,
    SYNCH_CART_FAIL,
    SET_CARTS_LOADED,
    REMOVE_CARTS_LOADED,
    USER_CART_SUCCESS,
    USER_CART_FAIL

} from "./types";
import { setAlert } from './alert';

const exito = '#00B906';

const error = '#bb2929';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Acción para obtener los carritos del usuario
export const get_user_carts = () => async dispatch => {
    dispatch({
        type: SET_CARTS_LOADED,
    });
    try {
        const accessToken = localStorage.getItem('access');

        if (!accessToken) {
            // Si no hay token de acceso, puedes manejar la situación de no autenticación aquí
            dispatch({
                type: USER_CARTS_FAIL,
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

        const res = await axios.get(`${apiUrl}/api/cart/user_carts/`, config);

        dispatch({
            type: USER_CARTS_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: REMOVE_CARTS_LOADED,
        });

    } catch (err) {
        dispatch({
            type: USER_CARTS_FAIL,
        });
        dispatch({
            type: REMOVE_CARTS_LOADED,
        });
    }
};

export const add_item = (productOptionID) => async (dispatch) => {
    dispatch({
        type: SET_ADD_ITEM_LOADED,
    });
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

        const product_option_id = productOptionID;
        const body = JSON.stringify({ product_option_id });

        const res = await axios.post(`${apiUrl}/api/cart/add_to_cart/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 201 || res.status === 200 ) {
            dispatch({
                type: ADD_ITEM_SUCCESS,
                payload: res.data,
            });
            dispatch({
                type: REMOVE_ADD_ITEM_LOADED,
            });

            dispatch(
                setAlert(
                    "Añadido a tu centro de compras",
                    exito
                )
            );
        } else {
            dispatch({
                type: ADD_ITEM_FAIL
            });
            dispatch({
                type: REMOVE_ADD_ITEM_LOADED,
            });
            dispatch(
                setAlert(
                    "Error al añadri a tu carrito",
                    error
                )
            );
        }
        dispatch({
            type: REMOVE_ADD_ITEM_LOADED,
        });

    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);

        // Manejar el error de autorización específicamente
        if (error.response && error.response.status === 401) {
            console.log("falla")
            // Puedes realizar acciones específicas para manejar la falta de autorización aquí
            // Por ejemplo, redireccionar a la página de inicio de sesión
            // O mostrar un mensaje de error al usuario
            // ...
        }
    } finally {
        // Cerrar la conexión de manera controlada si es necesario
        console.log("Proceso finalizado, conexión cerrada");
        dispatch({
            type: REMOVE_ADD_ITEM_LOADED,
        });
    }
};

// Acción para obtener el carrito del usuario
export const get_user_cart = (cartSlug) => async dispatch => {
    dispatch({
        type: SET_CARTS_LOADED,
    });
    try {
        const accessToken = localStorage.getItem('access');

        if (!accessToken) {
            // Si no hay token de acceso, puedes manejar la situación de no autenticación aquí
            dispatch({
                type: USER_CART_FAIL,
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

        const res = await axios.get(`${apiUrl}/api/cart/${cartSlug}/products/`, config);

        dispatch({
            type: USER_CART_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: REMOVE_CARTS_LOADED,
        });

    } catch (err) {
        dispatch({
            type: USER_CART_FAIL,
        });
        dispatch({
            type: REMOVE_CARTS_LOADED,
        });
    }
};

export const increment_item = (itemId) => async dispatch => {
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

        const item_id = itemId;
        const body = JSON.stringify({ item_id });

        const res = await axios.put(`${apiUrl}/api/cart/increment_item_quantity/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: INCREMENT_ITEM_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: INCREMENT_ITEM_FAIL
            }); 
        }
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);

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

export const decrement_item = (itemId) => async dispatch => {
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

        const item_id = itemId;
        const body = JSON.stringify({ item_id });

        const res = await axios.put(`${apiUrl}/api/cart/decrement_item_quantity/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: DECREMENT_ITEM_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: DECREMENT_ITEM_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
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

export const remove_item = (itemId) => async dispatch => {
    try {
        const accessToken = localStorage.getItem('access');

        const item_id = itemId;
        const body = JSON.stringify({ item_id });

        if (!accessToken) {
            throw new Error('No hay token de acceso disponible');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${accessToken}`,
            },
            data: body
        };
        const res = await axios.delete(`${apiUrl}/api/cart/remove_item_from_cart/`, config);
        // Manejar la respuesta exitosa aquí si es necesario
        if (res.status === 204) {
            dispatch({
                type: REMOVE_ITEM_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: REMOVE_ITEM_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);

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

export const remove_cart = (cartSlug) => async dispatch => {
    try {
        const accessToken = localStorage.getItem('access');

        const cart_slug = cartSlug;
        const body = JSON.stringify({ cart_slug });

        if (!accessToken) {
            throw new Error('No hay token de acceso disponible');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${accessToken}`,
            },
            data: body
        };
        const res = await axios.delete(`${apiUrl}/api/cart/remove_cart/`, config);
        // Manejar la respuesta exitosa aquí si es necesario
        if (res.status === 204) {
            dispatch({
                type: REMOVE_CART_SUCCESS,
                payload: res.data,
            });
            dispatch(
                setAlert(
                    "El carrito ha sido eliminado exitosamente de tu centro de compras",
                    exito
                )
            );
        } else {
            dispatch({
                type: REMOVE_CART_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);

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




