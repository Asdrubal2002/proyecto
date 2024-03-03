import {
    GET_PRODUCTS_LIST_CATEGORIES_STORE_SUCCESS,
    GET_PRODUCTS_LIST_CATEGORIES_STORE_FAIL,
    SET_CATEGORY_PRODUCT_LOADING,
    REMOVE_CATEGORY_PRODUCT_LOADING
} from "../actions/types";

const initialState = {
    categories: null,
    loading_category_products: false
};

export default function Store_Categories_Products(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CATEGORY_PRODUCT_LOADING:
            return {
                ...state,
                loading_category_products: true
            }
        case REMOVE_CATEGORY_PRODUCT_LOADING:
            return {
                ...state,
                loading_category_products: false
            }
        case GET_PRODUCTS_LIST_CATEGORIES_STORE_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case GET_PRODUCTS_LIST_CATEGORIES_STORE_FAIL:
            return {
                ...state,
                categories: null
            }
        default:
            return state
    }
}
