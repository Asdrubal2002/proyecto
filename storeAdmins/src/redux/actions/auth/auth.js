import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT
} from "./types";

import axios from 'axios'

const exito = '#00B906';

const error = '#E74C3C';

import { setAlert } from "../alert/alert";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const check_authenticated = () => async (dispatch) => {
   
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            token: localStorage.getItem("access"),
        });

        try {
            const res = await axios.post(
                `${apiUrl}/auth/jwt/verify/`,
                body,
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
};

export const load_user = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        try {
            const res = await axios.get(
                `${apiUrl}/auth/users/me/`,
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL,
                });
            }
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    });

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        email,
        password,
    });

    try {
        const res = await axios.post(
            `${apiUrl}/seller/login/`,
            body,
            config
        );

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(load_user());
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });
        }
        else {
            dispatch({
                type: LOGIN_FAIL,
            });
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });

        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert(err.response.data.error, error));

    }
};

export const refresh = () => async (dispatch) => {
    if (localStorage.getItem("refresh")) {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem("refresh"),
        });

        try {
            const res = await axios.post(
                `${apiUrl}/auth/jwt/refresh/`,
                body,
                config
            );

            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL,
                });
            }
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL,
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL,
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

