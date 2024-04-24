import { GET_COMMENT_STORE_SUCCESS, GET_COMMENT_STORE_FAIL } from "../../actions/comments/types";

const initialState = {
    comments: null,
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

        default:
            return state

    }
}
