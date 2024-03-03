import {
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    SET_WISHLIST_LOADED,
    REMOVE_WISHLIST_LOADED,
    ADD_WISHLIST_SUCCESS,
    ADD_WISHLIST_FAIL,
    REMOVE_WISHLIST_SUCCESS,
    GET_WISHLIST_STORES_SUCCESS,
    GET_WISHLIST_STORES_FAIL,
    ADD_WISHLIST_STORE_SUCCESS,
    ADD_WISHLIST_STORE_FAIL,
    REMOVE_WISHLIST_STORE_SUCCESS,
} from "../actions/types"

const initialState = {
    wishlist: [],
    loading_products: null,
    error: null,
};

export default function WishList(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_WISHLIST_LOADED:
            return {
                ...state,
                loading_products: true
            }
        case REMOVE_WISHLIST_LOADED:
            return {
                ...state,
                loading_products: false
            }
        case GET_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlist: Array.isArray(payload.wishlist) ? payload.wishlist : [],
                loading_products: false,
                error: null,
            };

        case GET_WISHLIST_FAIL:
            return {
                ...state,
                wishlist: null
            }

        case ADD_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlist: payload.wishlist
            };

        case ADD_WISHLIST_FAIL:
            return {
                ...state,
                products: null
            };

        case REMOVE_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlist: payload.wishlist
            };

        default:
            return state
    }
}
