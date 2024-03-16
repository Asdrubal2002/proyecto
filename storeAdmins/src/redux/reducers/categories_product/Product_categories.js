import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    SET_CATEGORY_LOADING,
    REMOVE_CATEGORY_LOADING,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL

} from "../../actions/categories_product/types";

GET_CATEGORIES_SUCCESS

const initialState = {
    categories: null,
    loading_category_product: false
};

export default function Product_category(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CATEGORY_LOADING:
            return {
                ...state,
                loading_category_product: true
            }
        case REMOVE_CATEGORY_LOADING:
            return {
                ...state,
                loading_category_product: false
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

        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case CREATE_CATEGORY_FAIL:
            return {
                ...state
            }


        default:
            return state
    }
}