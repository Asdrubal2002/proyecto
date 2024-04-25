import axios from 'axios';
import {
    GET_COMMENT_PRODUCT_SUCCESS,
    GET_COMMENT_PRODUCT_FAIL,
    ADD_COMMENT_PRODUCT_SUCCESS,
    ADD_COMMENT_PRODUCT_FAIL,
    DELETE_COMMENT_PRODUCT_SUCCESS,
    DELETE_COMMENT_PRODUCT_FAIL,
    EDIT_COMMENT_PRODUCT_SUCCESS,
    EDIT_COMMENT_PRODUCT_FAIL,
    SET_PRODUCTS_LOADING,
    REMOVE_PRODUCTS_LOADING,
    SET_PRODUCT_LOADING,
    REMOVE_PRODUCT_LOADING
} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_product_comments = (SlugProduct) => async dispatch => {
    dispatch({
        type: SET_PRODUCT_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/coments_product/${SlugProduct}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COMMENT_PRODUCT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COMMENT_PRODUCT_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCT_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_COMMENT_PRODUCT_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCT_LOADING
        });
    }
}

export const add_comment_product = (ProductId, Content) => async dispatch => {
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
        const product = ProductId;
        const content = Content;
        const body = JSON.stringify({ product, content });

        const res = await axios.post(`${apiUrl}/api/coments_product/create-comment/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 201) {
            dispatch({
                type: ADD_COMMENT_PRODUCT_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: ADD_COMMENT_PRODUCT_FAIL
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

export const delete_comment_product = (IdCommetn) => async dispatch => {
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

        const res = await axios.delete(`${apiUrl}/api/coments_product/delete_comment/${IdCommetn}/`, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            dispatch({
                type: DELETE_COMMENT_PRODUCT_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: DELETE_COMMENT_PRODUCT_FAIL
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

export const edit_comment_prodcut = (editedContent, IdComment) => async dispatch => {
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

        const res = await axios.patch(`${apiUrl}/api/coments_product/update_comment/${IdComment}/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            dispatch({
                type: EDIT_COMMENT_PRODUCT_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: EDIT_COMMENT_PRODUCT_FAIL
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

