import {
    GET_COMMENT_PRODUCT_SUCCESS,
    GET_COMMENT_PRODUCT_FAIL,
    ADD_COMMENT_PRODUCT_SUCCESS,
    ADD_COMMENT_PRODUCT_FAIL,
    DELETE_COMMENT_PRODUCT_SUCCESS,
    DELETE_COMMENT_PRODUCT_FAIL,
    EDIT_COMMENT_PRODUCT_SUCCESS,
    EDIT_COMMENT_PRODUCT_FAIL,
} from "../actions/types";

const initialState = {
    comments: null,
    comment: null
};

export default function Comments_Product(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_COMMENT_PRODUCT_SUCCESS:
            return {
                ...state,
                comments: payload.comments
            }

        case GET_COMMENT_PRODUCT_FAIL:
            return {
                ...state,
                comments: []
            }

        case ADD_COMMENT_PRODUCT_SUCCESS:
            return {
                ...state,
                comment: payload.comment,
                comments: payload.comments
            }

        case ADD_COMMENT_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_COMMENT_PRODUCT_SUCCESS:
            return {
                ...state,
                comments: payload.comments
            }

        case DELETE_COMMENT_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case EDIT_COMMENT_PRODUCT_SUCCESS:
            return {
                ...state,
                comments: payload.comments
            }

        case EDIT_COMMENT_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
            }


        default:
            return state

    }
}
