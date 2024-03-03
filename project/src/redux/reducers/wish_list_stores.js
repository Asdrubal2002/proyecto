import {
    SET_WISHLIST_LOADED,
    REMOVE_WISHLIST_LOADED,
    GET_WISHLIST_STORES_SUCCESS,
    GET_WISHLIST_STORES_FAIL,
    ADD_WISHLIST_STORE_SUCCESS,
    ADD_WISHLIST_STORE_FAIL,
    REMOVE_WISHLIST_STORE_SUCCESS,
} from "../actions/types"

const initialState = {
    wishlist_store: [],
    loading_products: null,
    error: null,
};

export default function WishList_Stores(state = initialState, action) {
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
        case GET_WISHLIST_STORES_SUCCESS:
            return {
                ...state,
                wishlist_store: Array.isArray(payload.wishlist_stores) ? payload.wishlist_stores : [],
                loading_products: false,
                error: null,
            };

        case GET_WISHLIST_STORES_FAIL:
            return {
                ...state,
                wishlist_store: null,
            }

        case ADD_WISHLIST_STORE_SUCCESS:
            return {
                ...state,
                wishlist_store: payload.wishlist_stores
            };

        case ADD_WISHLIST_STORE_FAIL:
            return {
                ...state,
                wishlist_store: null
            };

        case REMOVE_WISHLIST_STORE_SUCCESS:
            return {
                ...state,
                wishlist_store: payload.wishlist_stores
            };

        default:
            return state
    }
}
