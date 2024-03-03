import axios from 'axios';
import {
    GET_COMMENT_STORE_SUCCESS,
    GET_COMMENT_STORE_FAIL,
    SET_STORE_LOADING,
    REMOVE_STORE_LOADING,
    ADD_COMMENT_STORE_SUCCESS,
    ADD_COMMENT_STORE_FAIL,
    DELETE_COMMENT_STORE_SUCCESS,
    DELETE_COMMENT_STORE_FAIL,
    EDIT_COMMENT_STORE_SUCCESS,
    EDIT_COMMENT_STORE_FAIL
} from './types';

import { setAlert } from './alert';

const exito = '#00B906';

const error = '#bb2929';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_store_comments = (SlugStore) => async dispatch => {
    dispatch({
        type: SET_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/coments_store/${SlugStore}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COMMENT_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COMMENT_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_COMMENT_STORE_FAIL
        });
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    }
}

export const add_comment_store = (StoreId, Content) => async dispatch => {
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
        const store = StoreId;
        const content = Content;
        const body = JSON.stringify({ store, content });

        const res = await axios.post(`${apiUrl}/api/coments_store/create-comment/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 201) {
            dispatch({
                type: ADD_COMMENT_STORE_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: ADD_COMMENT_STORE_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el comentario:", error);

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

export const delete_comment_store = (IdCommetn) => async dispatch => {
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

        const res = await axios.delete(`${apiUrl}/api/coments_store/delete_comment/${IdCommetn}/`, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            dispatch({
                type: DELETE_COMMENT_STORE_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: DELETE_COMMENT_STORE_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el comentario:", error);

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

export const edit_comment_store = (editedContent, IdComment) => async dispatch => {
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
        const content = editedContent;
        const body = JSON.stringify({ content });

        const res = await axios.patch(`${apiUrl}/api/coments_store/update_comment/${IdComment}/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            dispatch({
                type: EDIT_COMMENT_STORE_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: EDIT_COMMENT_STORE_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el comentario:", error);

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