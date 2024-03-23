import {
    GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL,
    SET_PRODUCTS_LOADING,
    REMOVE_PRODUCTS_LOADING,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    REMOVE_PRODUCT_FAIL_LOADING,
    SET_PRODUCT_SUCCESS_LOADING
} from "../../actions/products/types";

const initialState = {
    products: null,
    product: null,
    options: null,
    loading_product: false,
    loading_products: false,
    count: null,
    next: null,
    previous: null
};

export default function Products(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PRODUCTS_LOADING:
            return {
                ...state,
                loading_products: true
            }
        case REMOVE_PRODUCTS_LOADING:
            return {
                ...state,
                loading_products: false
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.results.products,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null,
                count: null,
                next: null,
                previous: null
            }

        case SET_PRODUCT_SUCCESS_LOADING:
            return {
                ...state,
                loading_product: true
            }
        case REMOVE_PRODUCT_FAIL_LOADING:
            return {
                ...state,
                loading_product: false
            }

        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.product
            }

        case GET_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
            }


        default:
            return state
    }
}



