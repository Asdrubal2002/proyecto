import {
    CREATE_STORE_SUCCESS, 
    CREATE_STORE_FAIL,
    SET_LOADED_STORE,
    REMOVE_LOADED_STORE
} from "../../actions/store/types";

const initialState = {
    store: null,
    loading: false,
};

export default function Store_create(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADED_STORE:
            return {
                ...state,
                loading: true,
            };

        case REMOVE_LOADED_STORE:
            return {
                ...state,
                loading: false,
            };

        case CREATE_STORE_SUCCESS:
            return {
                ...state,
                store: payload
            }
        case CREATE_STORE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}