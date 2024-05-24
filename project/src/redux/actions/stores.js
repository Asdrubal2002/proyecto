import axios from 'axios';
import {
    GET_STORES_SUCCESS,
    GET_STORES_FAIL,
    GET_STORE_SUCCESS,
    GET_STORE_FAIL,
    RELATED_STORES_SUCCESS,
    RELATED_STORES_FAIL,
    SEARCH_STORES_SUCCESS,
    SEARCH_STORES_FAIL,
    GET_STORES_BY_ARRIVAL_SUCCESS,
    GET_STORES_BY_ARRIVAL_FAIL,
    SET_STORE_LOADING,
    REMOVE_STORE_LOADING,
    GET_STORE_LIST_CATEGORIES_SUCCESS,
    GET_STORE_LIST_CATEGORIES_FAIL,
    GET_STORE_POLICIES_SUCCESS,
    GET_STORE_POLICIES_FAIL,

    GET_STORE_LIKES_DISLIKE_SUCCESS,
    GET_STORE_LIKES_DISLIKE_FAIL,
    SET_LOADING_STORE_LIKES_DISLIKE,
    REMOVE_LOADING_STORE_LIKES_DISLIKE,
    ADD_STORE_LIKES_DISLIKE_SUCCESS,
    ADD_STORE_LIKES_DISLIKE_FAIL,
    GET_STORES_LIKED_SUCCESS,
    GET_STORES_LIKED_FAIL,
    SET_STORES_LOADING,
    REMOVE_STORES_LOADING,
    GET_STORE_FAQ_SUCCESS,
    GET_STORE_FAQ_FAIL
} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_stores = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/get-stores`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORES_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_STORES_FAIL
        });
    }
}

export const get_stores_list_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/get-stores?p=${page}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORES_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_STORES_FAIL
        });
    }
}

export const get_store = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/store/${storeSlug}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_FAIL
            });
        }
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_STORE_FAIL
        });
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    }
}

export const get_store_list_category = (slug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    console.log("Llega aquia", slug)

    try {
        const res = await axios.get(`${apiUrl}/api/store/by_category?slug=${slug}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_LIST_CATEGORIES_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_STORE_LIST_CATEGORIES_FAIL
        });
    }
}

export const get_store_list_category_page = (slug, page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {

        const res = await axios.get(`${apiUrl}/api/store/by_category?slug=${slug}&p=${page}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_LIST_CATEGORIES_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: GET_STORE_LIST_CATEGORIES_FAIL
        });
    }
}

export const get_search_stores = (slug, search) => async dispatch => {
    dispatch({
        type: SET_STORE_LOADING,
    });
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/store/search?c=${slug}&s=${search}`, config);

        if (res.status === 200) {
            dispatch({
                type: SEARCH_STORES_SUCCESS,
                payload: res.data
            });
            dispatch({
                type: REMOVE_STORE_LOADING,
            });
        } else {
            dispatch({
                type: SEARCH_STORES_FAIL
            });
            dispatch({
                type: REMOVE_STORE_LOADING,
            });
        }
    } catch (err) {
        dispatch({
            type: SEARCH_STORES_FAIL
        });
        dispatch({
            type: REMOVE_STORE_LOADING,
        });
    }
}

export const get_search_stores_page = (search, slug, page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/search?c=${slug}&s=${search}&p=${page}`, config);

        if (res.status === 200) {
            dispatch({
                type: SEARCH_STORES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: SEARCH_STORES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEARCH_STORES_FAIL
        });
    }
}

export const get_stores_by_arrival = () => async dispatch => {
    dispatch({
        type: SET_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/get-stores?order=asc&limit=6`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORES_BY_ARRIVAL_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORES_BY_ARRIVAL_FAIL
            });
        }
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_STORES_BY_ARRIVAL_FAIL
        });
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    }
}

export const get_related_stores = (storeSlug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/related/${storeSlug}`, config);

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: RELATED_STORES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: RELATED_STORES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: RELATED_STORES_FAIL
        });
    }
}

export const get_store_policies = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/policies/${storeSlug}/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_POLICIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_POLICIES_FAIL
            });
        }
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_STORE_POLICIES_FAIL
        });
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    }
}

export const get_stores_likes = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_LOADING_STORE_LIKES_DISLIKE
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/store/${storeSlug}/likes/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_LIKES_DISLIKE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_LIKES_DISLIKE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_STORE_LIKES_DISLIKE
        });
    } catch (err) {
        dispatch({
            type: GET_STORE_LIKES_DISLIKE_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_STORE_LIKES_DISLIKE
        });
    }
}

export const add_like_dislike_store = (storeSlug) => async dispatch => {
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
        const store_slug = storeSlug;
        const body = JSON.stringify({ store_slug });

        const res = await axios.post(`${apiUrl}/api/store/store/like_dislike/`, body, config);
        // Manejar la respuesta exitosa aquí si es necesario

        if (res.status === 200) {
            const { total_likes, user_liked } = res.data; // Desestructura los datos de la respuesta
            dispatch({
                type: ADD_STORE_LIKES_DISLIKE_SUCCESS,
                payload: { total_likes, user_liked }, // Actualiza el estado con los datos del usuario
            });
        } else {
            dispatch({
                type: ADD_STORE_LIKES_DISLIKE_FAIL
            });
        }
    } catch (error) {
        // Manejar el error de autorización específicamente
        if (error.response && error.response.status === 401) {
            // Puedes realizar acciones específicas para manejar la falta de autorización aquí
            // Por ejemplo, redireccionar a la página de inicio de sesión
            // O mostrar un mensaje de error al usuario
            // ...
        }
    } finally {
        // Cerrar la conexión de manera controlada si es necesario
    }



}

export const get_user_wish_list_stores = () => async dispatch => {
    dispatch({
        type: SET_STORES_LOADING,
    });
    try {
        const accessToken = localStorage.getItem('access');

        if (!accessToken) {
            // Si no hay token de acceso, puedes manejar la situación de no autenticación aquí
            dispatch({
                type: GET_STORES_LIKED_FAIL,
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

        const res = await axios.get(`${apiUrl}/api/store/liked-stores`, config);

        dispatch({
            type: GET_STORES_LIKED_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: REMOVE_STORES_LOADING,
        });
    } catch (err) {
        dispatch({
            type: GET_STORES_LIKED_FAIL,
        });
        dispatch({
            type: REMOVE_STORES_LOADING,
        });
    }
};

export const get_store_faqs = (storeSlug) => async dispatch => {
    dispatch({
        type: SET_STORE_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/store/${storeSlug}/faqs/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_STORE_FAQ_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_FAQ_FAIL
            });
        }
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    } catch (err) {
        dispatch({
            type: GET_STORE_FAQ_FAIL
        });
        dispatch({
            type: REMOVE_STORE_LOADING
        });
    }
}
