import {
    USERS_STORE_SUCCESS,
    USERS_STORE_FAIL,
    SET_LOADING_STORE_USERS,
    REMOVE_LOADING_STORE_USERS
} from "../../actions/users-store/types";



const initialState = {
    partners: null,
    loading_partners: false
};

export default function Partners_store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING_STORE_USERS:
            return {
                ...state,
                loading_partners: true
            }

        case REMOVE_LOADING_STORE_USERS:
            return {
                ...state,
                loading_partners: false
            }

        case USERS_STORE_SUCCESS:
            return {
                ...state,
                partners: payload.partners
            }
        case USERS_STORE_FAIL:
            return {
                ...state,
                partners: null
            };

        default:
            return state
    }

}
