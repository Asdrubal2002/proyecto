import axios from "axios";
import { GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL } from "./types";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_user_profile = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${apiUrl}/api/profile/user`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_USER_PROFILE_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_USER_PROFILE_FAIL
            });
        }
    }
}

