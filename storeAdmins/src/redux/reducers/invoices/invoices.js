import {
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    SET_LOADING_INVOICES,
    REMOVE_LOADING_INVOICES,
    GET_STATUS_SUCCESS,
    GET_STATUS_FAIL,
    SET_LOADING_STATUS,
    REMOVE_LOADING_STATUS,

    GET_INVOICE_SUCCESS,
    GET_INVOICE_FAIL,
    SET_LOADING_INVOICE,
    REMOVE_LOADING_INVOICE
} from "../../actions/invoices/types";


const initialState = {
    invoices: null,
    loading_invoices: false,
    status: null,
    loading_status: false,
    invoice: null,
    loading_invoice: false
};

export default function Invoices(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING_INVOICES:
            return {
                ...state,
                loading_invoices: true
            }
        case REMOVE_LOADING_INVOICES:
            return {
                ...state,
                loading_invoices: false
            }

        case SET_LOADING_STATUS:
            return {
                ...state,
                loading_status: true
            }
        case REMOVE_LOADING_STATUS:
            return {
                ...state,
                loading_status: false
            }
        case GET_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: payload.invoices
            }
        case GET_INVOICES_FAIL:
            return {
                ...state,
                invoices: null,
            }

        case GET_STATUS_SUCCESS:
            return {
                ...state,
                status: payload
            }
        case GET_STATUS_FAIL:
            return {
                ...state,
                status: null
            }

        case SET_LOADING_INVOICE:
            return {
                ...state,
                loading_invoice: true
            }
        case REMOVE_LOADING_INVOICE:
            return {
                ...state,
                loading_invoice: false
            }

        case GET_INVOICE_SUCCESS:
            return {
                ...state,
                invoice: payload
            }

        case GET_INVOICE_FAIL:
            return {
                ...state,
                invoice: null,
            }


        default:
            return state
    }



}
