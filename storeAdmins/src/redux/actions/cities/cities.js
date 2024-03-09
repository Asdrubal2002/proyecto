import axios from 'axios';
import { GET_CITIES_SUCCESS,GET_CITIES_FAIL } from './types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const get_cities = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/cities/cities`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CITIES_SUCCESS,
                payload: res.data
            });
        } else {
            
            dispatch({
                type: GET_CITIES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CITIES_FAIL
        });
    }
}