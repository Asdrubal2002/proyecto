import axios from 'axios';

import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    SET_PRODUCTS_LOADING,
    REMOVE_PRODUCTS_LOADING,
    GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_SUCCESS,
    GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL,
    SET_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING,
    REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    SET_PRODUCT_LOADING,
    REMOVE_PRODUCT_LOADING,
    GET_OPTIONS_SUCCESS,
    GET_OPTIONS_FAIL,
    GET_PRODUCT_LIKES_DISLIKE_SUCCESS,
    GET_PRODUCT_LIKES_DISLIKE_FAIL,
    SET_LOADING_PRODUCT_LIKES_DISLIKE,
    REMOVE_LOADING_PRODUCT_LIKES_DISLIKE,
    ADD_PRODUCT_LIKES_DISLIKE_SUCCESS,
    ADD_PRODUCT_LIKES_DISLIKE_FAIL,
    GET_PRDUCTS_LIKED_SUCCESS,
    GET_PRDUCTS_LIKED_FAIL,
    GET_FILTERED_PRODUCTS_SUCCESS,
    GET_FILTERED_PRODUCTS_FAIL,
    GET_FILTERED_PRODUCTS_BY_CATEGORIES_SUCCESS,    
    GET_FILTERED_BY_CATEGORIES_PRODUCTS_FAIL
} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_products = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/products/${storeSlug}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}

export const get_options = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_PRODUCT_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/options/${storeSlug}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_OPTIONS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_OPTIONS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCT_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_OPTIONS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCT_LOADING
        });
    }
}

export const get_products_list_page = (storeSlug, page) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/products/${storeSlug}?p=${page}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}

export const get_products_by_category = (storeSlug, categorySlug) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/product/${storeSlug}/${categorySlug}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
        });
    }
}

export const get_products_by_category_page = (storeSlug, categorySlug, page) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/product/${storeSlug}/${categorySlug}?p=${page}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
        });
    }
}

export const get_product = (slugProduct) => async dispatch => {
    dispatch({
        type: SET_PRODUCT_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/detail/${slugProduct}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCT_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCT_LOADING
        });
    }
}

export const get_product_likes = (slugProduct) => async dispatch => {
    dispatch({
        type: SET_LOADING_PRODUCT_LIKES_DISLIKE
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/product/${slugProduct}/likes/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_LIKES_DISLIKE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_LIKES_DISLIKE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_PRODUCT_LIKES_DISLIKE
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_LIKES_DISLIKE_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_PRODUCT_LIKES_DISLIKE
        });
    }
}

export const add_like_dislike_product = (slugProduct) => async dispatch => {
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
        const product_slug = slugProduct;
        const body = JSON.stringify({ product_slug });

        const res = await axios.post(`${apiUrl}/api/product/product/like_dislike/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            const { total_likes, user_liked } = res.data; // Desestructura los datos de la respuesta
            dispatch({
                type: ADD_PRODUCT_LIKES_DISLIKE_SUCCESS,
                payload: { total_likes, user_liked }, // Actualiza el estado con los datos del usuario
            });
        } else {
            dispatch({
                type: ADD_PRODUCT_LIKES_DISLIKE_FAIL
            });
        }
    } catch (error) {
        console.error("Error al agregar el likes:", error);

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

export const get_user_wish_list_products = () => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING,
    });
    try {
        const accessToken = localStorage.getItem('access');

        if (!accessToken) {
            // Si no hay token de acceso, puedes manejar la situación de no autenticación aquí
            dispatch({
                type: GET_PRDUCTS_LIKED_FAIL,
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

        const res = await axios.get(`${apiUrl}/api/product/liked-products`, config);

        dispatch({
            type: GET_PRDUCTS_LIKED_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING,
        });

    } catch (err) {
        dispatch({
            type: GET_PRDUCTS_LIKED_FAIL,
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING,
        });
    }
};

export const get_products_filtered = (storeSlug, name, price_min, price_max) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/products-filtered/${storeSlug}/?name=${name}&price_min=${price_min}&price_max=${price_max}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_FILTERED_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FILTERED_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_FILTERED_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}

export const get_products_filtered_page = (storeSlug, name, price_min, price_max, page) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/products-filtered/${storeSlug}/?name=${name}&p=${page}&price_max=${price_max}&price_min=${price_min}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_FILTERED_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FILTERED_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_FILTERED_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}

export const get_products_filtered_category = (storeSlug, categorySlug, name, price_min, price_max) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/products-filtered/${storeSlug}/${categorySlug}/?name=${name}&price_min=${price_min}&price_max=${price_max}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_FILTERED_PRODUCTS_BY_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FILTERED_BY_CATEGORIES_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_FILTERED_BY_CATEGORIES_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}


export const get_products_filtered_category_page = (storeSlug, categorySlug, name, price_min, price_max, page) => async dispatch => {
    dispatch({
        type: SET_PRODUCTS_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/product/products-filtered/${storeSlug}/${categorySlug}/?name=${name}&p=${page}&price_max=${price_max}&price_min=${price_min}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_FILTERED_PRODUCTS_BY_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FILTERED_BY_CATEGORIES_PRODUCTS_FAIL
            });
        }
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_FILTERED_BY_CATEGORIES_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        });
    }
}






