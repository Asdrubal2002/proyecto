import {
    GET_CITIES_SUCCESS, 
    GET_CITIES_FAIL
} from "../actions/types";

const initialState = {
    cities: null,
    countries: null
};

export default function Cities(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      
        case GET_CITIES_SUCCESS:
            return {
                ...state,
                cities: payload.cities,
                countries: payload.countries
            }
        case GET_CITIES_FAIL:
            return {
                ...state,
                cities: null,
                countries: null
            }
        default:
            return state
    }
}