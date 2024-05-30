import axios from 'axios';

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
} from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_invoices_admin = () => async dispatch => {
    dispatch({
        type: SET_LOADING_INVOICES
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/invoice/admin-invoices`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_INVOICES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_INVOICES_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_INVOICES
        });
    } catch (err) {
        dispatch({
            type: GET_INVOICES_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_INVOICES
        });
    }
}

export const get_status = () => async dispatch => {
    dispatch({
        type: SET_LOADING_STATUS
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/invoice/invoice-status`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_STATUS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STATUS_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_STATUS
        });
    } catch (err) {
        dispatch({
            type: GET_STATUS_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_STATUS
        });
    }
}

export const get_invoice = (transaction_number) => async dispatch => {
    dispatch({
        type: SET_LOADING_INVOICE
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`

        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/invoice/invoice-detail/${transaction_number}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_INVOICE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_INVOICE_FAIL
            });
        }
        dispatch({
            type: REMOVE_LOADING_INVOICE
        });
    } catch (err) {
        dispatch({
            type: GET_INVOICE_FAIL
        });
        dispatch({
            type: REMOVE_LOADING_INVOICE
        });
    }
}
