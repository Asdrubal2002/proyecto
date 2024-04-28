import axios from 'axios';
import {
    INVOICE_SUCCESS,
    INVOICE_FAIL,
    SET_LOADER_INVOICE,
    REMOVE_LOADER_INVOICE,
    INVOICES_SUCCESS,
    INVOICES_FAIL,
    INVOICES_SUCCESS_DELETE,
    INVOICES_FAIL_DELETE
} from './types';

import { setAlert } from './alert';

const exito = '#00B906';

const errorC = '#bb2929';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const add_invoice = (profile, storeP, shipping_id, location, cartP) => async dispatch => {
    dispatch({
        type: SET_LOADER_INVOICE,
    });
    console.log("llegga")

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

        const buyer = profile;
        const store = storeP;
        const shipping_method = shipping_id;
        const shipping_location = location;
        const cart = cartP
        const body = JSON.stringify({ buyer, store, shipping_method, shipping_location, cart });

        const res = await axios.post(`${apiUrl}/api/invoice/add_invoice`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 201) {
            dispatch({
                type: INVOICE_SUCCESS,
                payload: res.data,
            });
            dispatch(
                setAlert(
                    "¡Felicidades! ¡Esperamos que tu compra sea un éxito!",
                    exito
                )
            );
        } else {
            dispatch({
                type: INVOICE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADER_INVOICE,
        });
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

export const get_user_invoices = () => async dispatch => {
    dispatch({
        type: SET_LOADER_INVOICE,
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

        const res = await axios.get(`${apiUrl}/api/invoice/invoices`, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            dispatch({
                type: INVOICES_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: INVOICES_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADER_INVOICE,
        });
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

export const remove_invoice = (IdInvoice) => async dispatch => {
    dispatch({
        type: SET_LOADER_INVOICE,
    });
    try {
        const accessToken = localStorage.getItem('access');

        const invoice_id = IdInvoice;
        const body = JSON.stringify({ invoice_id });

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
        const res = await axios.delete(`${apiUrl}/api/invoice/delete_invoice`, config);
        // Manejar la respuesta exitosa aquí si es necesario
        if (res.status === 204) {
            dispatch({
                type: INVOICES_SUCCESS_DELETE,
                payload: res.data,
            });
        } else {
            dispatch({
                type: INVOICES_FAIL_DELETE
            });
        }
        dispatch({
            type: REMOVE_LOADER_INVOICE,
        });
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);

        // Manejar el error de autorización específicamente
        if (error.response && error.response.status === 400) {
            dispatch(setAlert("Tu pedido ya esta en proceso. No lo puedes eliminar.", errorC));
            dispatch({
                type: INVOICES_FAIL_DELETE
            });
            dispatch({
                type: REMOVE_LOADER_INVOICE,
            });
        }
    } finally {
        // Cerrar la conexión de manera controlada si es necesario
        console.log("Proceso finalizado, conexión cerrada");
    }
}