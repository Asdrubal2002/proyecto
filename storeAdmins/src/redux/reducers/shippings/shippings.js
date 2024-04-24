import {
    GET_SHIPPINGS_SUCCESS,
    GET_SHIPPINGS_FAIL,
    SET_SHIPPINGS_LOADING,
    REMOVE_SHIPPINGS_LOADING,
    ADD_SHIPPINGS_SUCCESS,
    ADD_SHIPPINGS_FAIL,
    DELETE_SHIPPING_SUCCESS,
    DELETE_SHIPPING_FAIL,
    CHANGE_STATUS_SHIPPING_SUCCESS,
    CHANGE_STATUS_SHIPPING_FAIL,
    UPDATE_SHIPPING_SUCCESS,
    UPDATE_SHIPPING_FAIL
} from "../../actions/shipping/types";

const initialState = {
    shippings: null,
    loading_shippings: false
};

export default function Shippings_store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_SHIPPINGS_LOADING:
            return {
                ...state,
                loading_shippings: true
            }

        case REMOVE_SHIPPINGS_LOADING:
            return {
                ...state,
                loading_shippings: false
            }
        case GET_SHIPPINGS_SUCCESS:
            return {
                ...state,
                shippings: payload.shippings
            }
        case GET_SHIPPINGS_FAIL:
            return {
                ...state,
                shippings: null
            }

        case ADD_SHIPPINGS_SUCCESS:
            return {
                ...state,
                shippings: payload.shippings
            }
        case ADD_SHIPPINGS_FAIL:
            return {
                ...state
            }

        case DELETE_SHIPPING_SUCCESS:
            return {
                ...state,
                shippings: payload.shippings
            }
        case DELETE_SHIPPING_FAIL:
            return {
                ...state
            }

        case CHANGE_STATUS_SHIPPING_SUCCESS:
            return {
                ...state,
                shippings: payload.shippings

            }
        case CHANGE_STATUS_SHIPPING_FAIL:
            return {
                ...state
            }

        case UPDATE_SHIPPING_SUCCESS:
            return {
                ...state,
                shippings: payload.shippings

            }
        case UPDATE_SHIPPING_FAIL:
            return {
                ...state
            }

        default:
            return state
    }

}
