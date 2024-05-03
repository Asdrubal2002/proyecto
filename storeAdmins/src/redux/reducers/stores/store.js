import {
    CREATE_STORE_SUCCESS,
    CREATE_STORE_FAIL,

    GET_STORE_SUCCESS,
    GET_STORE_FAIL,

    SET_LOADED_STORE,
    REMOVE_LOADED_STORE,

    GET_STORE_POLICIES_SUCCESS,
    GET_STORE_POLICIES_FAIL,

    SET_LOADING_STORE_POLICIES_SUCCESS,
    REMOVE_LOADING_GET_STORE_POLICIES_FAIL
} from "../../actions/store/types";

const initialState = {
    store: null,
    loading: false,
    policies: null,
    loading_policies: false

};

export default function Store(state = initialState, action) {
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

        case GET_STORE_SUCCESS:
            return {
                ...state,
                store: payload.store
            }

        case GET_STORE_FAIL:
            return {
                ...state
            }

        case GET_STORE_POLICIES_SUCCESS:
            return {
                ...state,
                policies: payload.policies
            }
        case GET_STORE_POLICIES_FAIL:
            return {
                ...state,
                policies: null
            }

        case SET_LOADING_STORE_POLICIES_SUCCESS:
            return {
                ...state,
                loading_policies: true,
            };

        case REMOVE_LOADING_GET_STORE_POLICIES_FAIL:
            return {
                ...state,
                loading_policies: false,
            };



        default:
            return state
    }
}