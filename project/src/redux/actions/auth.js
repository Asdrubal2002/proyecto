import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    CHANGE_PASSWORD_SET_SUCCESS,
    CHANGE_PASSWORD_SET_FAIL
} from './types'

import { setAlert } from './alert';

const exito = '#00B906';

const error = '#E74C3C';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

import axios from 'axios';

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

export const signup = (email, password, re_password) => async (dispatch) => {
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
        re_password,
    });

    try {
        const res = await axios.post(`${apiUrl}/auth/users/`, body, config);
        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });
            dispatch(setAlert("Te enviamos un correo para activar tu cuenta. Revisa el correo de spam", exito));
        } else {
            dispatch({
                type: SIGNUP_FAIL,
            });
            dispatch(setAlert("Error al crear cuenta", error));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        if (err.response && err.response.status === 400) {
            dispatch(setAlert("Ya existe una cuenta registrada con este correo electrónico.", error));
        } else {
            dispatch(setAlert("Error conectando con el servidor, intenta más tarde.", error));
        }
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
            `${apiUrl}/auth/jwt/create/`,
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
            dispatch(setAlert("Nos alegra que estes aqui.", exito));
        } else {
            dispatch({
                type: LOGIN_FAIL,
            });
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });
            dispatch(setAlert("Error al iniciar sesion.", error));
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Error al iniciar sesion.", error));
    }
};

export const activate = (uid, token) => async (dispatch) => {

    dispatch({
        type: SET_AUTH_LOADING,
    });

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        uid,
        token,
    });

    try {
        const res = await axios.post(
            `${apiUrl}/auth/users/activation/`,
            body,
            config
        );

        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS,
            });
            dispatch(setAlert("Cuenta activada correctamente", exito));
        } else {
            dispatch({
                type: ACTIVATION_FAIL,
            });
            dispatch(setAlert("Error activando cuenta", error));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });

    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        setAlert("Error al conectar con el servidor, intenta mas tarde.", error);
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

export const reset_password = (email) => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    });

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(
            `${apiUrl}/auth/users/reset_password/`,
            body,
            config
        );

        if (res.status === 204) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
            });
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });
            dispatch(setAlert("Contraseña recuperada, revisa tu correo", exito));
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL,
            });
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });
            dispatch(setAlert("Error al enviar el correo electrónico de restablecimiento de contraseña", error));
        }
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Error al enviar el correo electrónico de restablecimiento de contraseña", error));
    }
};

export const reset_password_confirm =
    (uid, token, new_password, re_new_password) => async (dispatch) => {
        dispatch({
            type: SET_AUTH_LOADING,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            uid,
            token,
            new_password,
            re_new_password,
        });

        if (new_password !== re_new_password) {
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL,
            });
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });
            dispatch(setAlert("Las contraseñas no coinciden", error));
        } else {
            try {
                const res = await axios.post(
                    `${apiUrl}/auth/users/reset_password_confirm/`,
                    body,
                    config
                );

                if (res.status === 204) {
                    dispatch({
                        type: RESET_PASSWORD_CONFIRM_SUCCESS,
                    });
                    dispatch({
                        type: REMOVE_AUTH_LOADING,
                    });
                    dispatch(setAlert("La contraseña se ha restablecido con éxito", exito));
                } else {
                    dispatch({
                        type: RESET_PASSWORD_CONFIRM_FAIL,
                    });
                    dispatch({
                        type: REMOVE_AUTH_LOADING,
                    });
                    dispatch(setAlert("Error al restablecer tu contraseña", error));
                }
            } catch (err) {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL,
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING,
                });
                dispatch(setAlert("Error al restablecer tu contraseña", error));
            }
        }
    };


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Cerro sesión existosamente', exito));
}



export const change_password_set = (new_password, re_new_password, current_password) => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        new_password,
        re_new_password,
        current_password,
    });

    try {
        const res = await axios.post(`${apiUrl}/auth/users/set_password/`, body, config);
        if (res.status === 204) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });
            dispatch(setAlert("¡Tu contraseña se ha cambiado con éxito! Ahora puedes acceder a tu cuenta con tu nueva contraseña.", exito));
        } else {
            dispatch({
                type: SIGNUP_FAIL,
            });
            dispatch(setAlert("Error al crear cuenta", error));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        if (err.response && err.response.status === 400) {
            dispatch(setAlert("Lo sentimos, no se pudo cambiar la contraseña. Por favor, asegúrate de que la contraseña actual sea correcta e inténtalo de nuevo.", error));
        } else {

        }
    }
};

export const change_email_set = (
    current_password,
    new_email,
    re_new_email
) => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        current_password,
        new_email,
        re_new_email
    });

    try {
        const res = await axios.post(`${apiUrl}/auth/users/set_email/`, body, config);
        if (res.status === 204) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });
            dispatch(setAlert("¡Tu Correo electrónico se ha cambiado con éxito! Ahora puedes acceder a tu cuenta con tu nuevo correo electrónico.", exito));
        } else {
            dispatch({
                type: SIGNUP_FAIL,
            });
            dispatch(setAlert("Error al crear cuenta", error));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
        });
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        if (err.response && err.response.status === 400) {
            dispatch(setAlert("Lo sentimos, no se pudo cambiar el correo. Por favor, asegúrate de que el correo actual sea correcto e inténtalo de nuevo.", error));
        } else {

        }
    }
};

