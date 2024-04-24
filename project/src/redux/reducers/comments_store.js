import {
    GET_COMMENT_STORE_SUCCESS,
    GET_COMMENT_STORE_FAIL,
    ADD_COMMENT_STORE_SUCCESS,
    ADD_COMMENT_STORE_FAIL,
    DELETE_COMMENT_STORE_SUCCESS,
    DELETE_COMMENT_STORE_FAIL,
    EDIT_COMMENT_STORE_SUCCESS,
    EDIT_COMMENT_STORE_FAIL
} from "../actions/types";

const initialState = {
    comments: null,
    comment: null
};

export default function Comments_Store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_COMMENT_STORE_SUCCESS:
            return {
                ...state,
                comments: action.payload,
            }

        case GET_COMMENT_STORE_FAIL:
            return {
                ...state,
                comments: []
            }

        case ADD_COMMENT_STORE_SUCCESS:
            return {
                ...state,
                comments: action.payload,
            }

        case ADD_COMMENT_STORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_COMMENT_STORE_SUCCESS:
            return {
                ...state,
                comments: action.payload,
            }

        case DELETE_COMMENT_STORE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case EDIT_COMMENT_STORE_SUCCESS:
            return {
                ...state,
                comments: action.payload,
            }

        case EDIT_COMMENT_STORE_FAIL:
            return {
                ...state,
                error: action.payload,
            }


        default:
            return state

    }
}
