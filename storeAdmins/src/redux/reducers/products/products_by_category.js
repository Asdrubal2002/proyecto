import {
    GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_SUCCESS,
    GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL,
    SET_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING,
    REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING
} from "../../actions/products/types";

const initialState = {
    products: null,
    count: null,
    next: null,
    previous: null,
    loading_products_by_category: false,
};

export default function Products_ByCategory(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING:
            return {
                ...state,
                loading_products_by_category: true
            }
        case REMOVE_PRODUCTS_LIST_BY_CATEGORIES_STORE_LOADING:
            return {
                ...state,
                loading_products_by_category: false
            }
        case GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_SUCCESS:
            return {
                ...state,
                products: payload.results.products,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_PRODUCTS_LIST_BY_CATEGORIES_STORE_FAIL:
            return {
                ...state,
                products: null,
                count: null,
                next: null,
                previous: null
            }

        default:
            return state
    }
}



