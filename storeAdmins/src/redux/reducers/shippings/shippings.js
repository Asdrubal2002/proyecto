import {
    GET_SHIPPINGS_SUCCESS,
    GET_SHIPPINGS_FAIL,
    SET_SHIPPINGS_LOADING,
    REMOVE_SHIPPINGS_LOADING
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

        default:
            return state
    }

}
