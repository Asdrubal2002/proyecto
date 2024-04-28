import {
    INVOICE_SUCCESS,
    INVOICE_FAIL,
    SET_LOADER_INVOICE,
    REMOVE_LOADER_INVOICE,
    INVOICES_SUCCESS,
    INVOICES_FAIL,
    INVOICES_SUCCESS_DELETE,
    INVOICES_FAIL_DELETE
} from "../actions/types";

const initialState = {
    loading: false,
    invoices: []
};

export default function Invoice(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADER_INVOICE:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_LOADER_INVOICE:
            return {
                ...state,
                loading: false,
            };
        case INVOICE_SUCCESS:
            return {
                ...state,
                invoice: action.payload,
            }
        case INVOICE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case INVOICES_SUCCESS:
            return {
                ...state,
                invoices: action.payload,
            }
        case INVOICES_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case INVOICES_SUCCESS_DELETE:
            return {
                ...state,
                invoice: action.payload,
            }
        case INVOICES_FAIL_DELETE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
}