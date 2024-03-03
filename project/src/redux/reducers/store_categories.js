import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    SET_CATEGORY_LOADING,
    REMOVE_CATEGORY_LOADING
} from "../actions/types";

const initialState = {
    categories: null,
    loading_category_store: false
};

export default function Store_Categories(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CATEGORY_LOADING:
            return {
                ...state,
                loading_category_store: true
            }
        case REMOVE_CATEGORY_LOADING:
            return {
                ...state,
                loading_category_store: false
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
        default:
            return state
    }
}