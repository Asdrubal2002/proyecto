import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    GET_USER_LOCATION_SUCCESS,
    GET_USER_LOCATION_FAIL,
    UPDATE_USER_LOCATION_SUCCESS,
    UPDATE_USER_LOCATION_FAIL
} from "../actions/types";

const initialState = {
    profile: null,
    profile_location: null
};

export default function Profile(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile
            }
        case GET_USER_PROFILE_FAIL:
            return {
                ...state
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                ...state
            }
        case GET_USER_LOCATION_SUCCESS:
            return {
                ...state,
                profile_location: payload.profile_location
            }
        case GET_USER_LOCATION_FAIL:
            return {
                ...state
            }

        case UPDATE_USER_LOCATION_SUCCESS:
            return {
                ...state,
                profile_location: payload.profile_location
            }
        case UPDATE_USER_LOCATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}