import { GET_CITIES_SUCCESS,GET_CITIES_FAIL } from "../../actions/cities/types";

const initialState = {
    cities: null,
};

export default function Cities(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      
        case GET_CITIES_SUCCESS:
            return {
                ...state,
                cities: payload.cities
            }
        case GET_CITIES_FAIL:
            return {
                ...state,
                cities: null,
            }
        default:
            return state
    }
}