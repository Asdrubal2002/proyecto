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
    USER_CART_FAIL,

    USER_CART_SUCCESS_VIEW_FROM_STORE,
    USER_CART_FAIL_VIEW_FROM_STORE,
    SET_CART_VIEW_STORE_LOADING,
    REMOVE_CART_VIEW_STORE_LOADING,

    COUNT_USER_CARTS_SUCCESS,
    COUNT_USER_CARTS_FAIL
} from '../actions/types';

const initialState = {
    carts: [],
    cart: null,
    loading_to_car: false,
    loading_carts: false,
    error: null,
    count_carts: null
};

export default function Cart(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ADD_ITEM_LOADED:
            return {
                ...state,
                loading_to_car: true,
            };

        case REMOVE_ADD_ITEM_LOADED:
            return {
                ...state,
                loading_to_car: false,
            };

        case SET_CARTS_LOADED:
            return {
                ...state,
                loading_carts: true,
            };

        case REMOVE_CARTS_LOADED:
            return {
                ...state,
                loading_carts: false,
            };

        case USER_CARTS_SUCCESS:
            return {
                ...state,
                carts: action.payload,
            }
        case USER_CARTS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                cart: payload.cart
            };
        case ADD_ITEM_FAIL:
            return {
                ...state,
                carts: null
            };

        case USER_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload,
            }
        case USER_CART_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case INCREMENT_ITEM_SUCCESS:
            return {
                ...state,
                cart: payload.cart
            };

        case INCREMENT_ITEM_FAIL:
            return {
                ...state,
                cart: null
            };

        case DECREMENT_ITEM_SUCCESS:
            return {
                ...state,
                cart: payload.cart
            };

        case DECREMENT_ITEM_FAIL:
            return {
                ...state,
                cart: null
            };

        case REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                cart: payload.cart
            };

        case REMOVE_ITEM_FAIL:
            return {
                ...state
            };

        case REMOVE_CART_SUCCESS:
            return {
                ...state,
                cart: payload.cart
            };

        case REMOVE_CART_FAIL:
            return {
                ...state
            };

        case USER_CART_SUCCESS_VIEW_FROM_STORE:
            return {
                ...state,
                cart: action.payload,
            }
        case USER_CART_FAIL_VIEW_FROM_STORE:
            return {
                ...state,
                error: action.payload,
            };

        case SET_CART_VIEW_STORE_LOADING:
            return {
                ...state,
                loading_carts: true,
            };

        case REMOVE_CART_VIEW_STORE_LOADING:
            return {
                ...state,
                loading_carts: false,
            };

        case COUNT_USER_CARTS_SUCCESS:
            return {
                ...state,
                count_carts: payload.cart_count,
            }
        case COUNT_USER_CARTS_FAIL:
            return {
                ...state,
                count_carts: null,
            };

        default:
            return state;
    }
}
