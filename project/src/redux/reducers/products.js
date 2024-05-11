import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    SET_PRODUCTS_LOADING,
    REMOVE_PRODUCTS_LOADING,
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
} from "../actions/types";

const initialState = {
    products: null,
    product: null,
    options: null,
    loading_product: false,
    loading_products: false,
    count: null,
    next: null,
    previous: null,
    loading_likes: null,
    likes: null,
    products_liked:null
};

export default function Products(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PRODUCTS_LOADING:
            return {
                ...state,
                loading_products: true
            }
        case REMOVE_PRODUCTS_LOADING:
            return {
                ...state,
                loading_products: false
            }
        case SET_PRODUCT_LOADING:
            return {
                ...state,
                loading_product: true
            }
        case REMOVE_PRODUCT_LOADING:
            return {
                ...state,
                loading_product: false
            }

        case SET_LOADING_PRODUCT_LIKES_DISLIKE:
            return {
                ...state,
                loading_likes: true
            }
        case REMOVE_LOADING_PRODUCT_LIKES_DISLIKE:
            return {
                ...state,
                loading_likes: false
            }

        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.product
            }

        case GET_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
            }


        case GET_OPTIONS_SUCCESS:
            return {
                ...state,
                options: payload.options
            }

        case GET_OPTIONS_FAIL:
            return {
                ...state,
                options: null,
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.results.products,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null,
                count: null,
                next: null,
                previous: null
            }

        case GET_PRODUCT_LIKES_DISLIKE_SUCCESS:
            return {
                ...state,
                likes: payload
            }

        case GET_PRODUCT_LIKES_DISLIKE_FAIL:
            return {
                ...state,
                likes: null,
            }

        case ADD_PRODUCT_LIKES_DISLIKE_SUCCESS:
            return {
                ...state,
                likes: {
                    ...state.likes,
                    total_likes: payload.total_likes,
                    user_liked: payload.user_liked,
                }
            };
        case ADD_PRODUCT_LIKES_DISLIKE_FAIL:
            console.log('Error en fallo:', error);
            return {
                ...state,
                likes: {
                    ...state.likes,
                    user_liked: false, // O el valor predeterminado que desees cuando hay un fallo
                }
            };

        case GET_PRDUCTS_LIKED_SUCCESS:
            return {
                ...state,
                products_liked: payload
            };

        case GET_PRDUCTS_LIKED_FAIL:
            return {
                ...state,
                products_liked: null
            }

        default:
            return state
    }
}