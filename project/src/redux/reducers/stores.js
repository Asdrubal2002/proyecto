import {
    GET_STORES_SUCCESS,
    GET_STORES_FAIL,
    GET_STORE_SUCCESS,
    GET_STORE_FAIL,
    RELATED_STORES_SUCCESS,
    RELATED_STORES_FAIL,
    SEARCH_STORES_SUCCESS,
    SEARCH_STORES_FAIL,
    GET_STORES_BY_ARRIVAL_SUCCESS,
    GET_STORES_BY_ARRIVAL_FAIL,
    SET_STORE_LOADING,
    REMOVE_STORE_LOADING,
    GET_STORE_LIST_CATEGORIES_SUCCESS,
    GET_STORE_LIST_CATEGORIES_FAIL,
    GET_STORE_POLICIES_SUCCESS,
    GET_STORE_POLICIES_FAIL,

    GET_STORE_LIKES_DISLIKE_SUCCESS,
    GET_STORE_LIKES_DISLIKE_FAIL,
    SET_LOADING_STORE_LIKES_DISLIKE,
    REMOVE_LOADING_STORE_LIKES_DISLIKE,
    ADD_STORE_LIKES_DISLIKE_SUCCESS,
    ADD_STORE_LIKES_DISLIKE_FAIL,
    GET_STORES_LIKED_SUCCESS,
    GET_STORES_LIKED_FAIL,
    SET_STORES_LOADING,
    REMOVE_STORES_LOADING
} from "../actions/types";

const initialState = {
    stores: null,
    stores_arrival: null,
    store_list_category: null,
    store: null,
    search_stores: null,
    related_stores: null,
    loading: false,
    count: null,
    next: null,
    previous: null,
    policies: null,
    likes: null,
    loading_likes: null,
    stores_liked: null
};

export default function Stores(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_STORE_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_STORE_LOADING:
            return {
                ...state,
                loading: false
            }
        case GET_STORES_SUCCESS:
            return {
                ...state,
                stores: payload.results.stores,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_STORES_FAIL:
            return {
                ...state,
                stores: null,
                count: null,
                next: null,
                previous: null
            }
        case GET_STORES_BY_ARRIVAL_SUCCESS:
            return {
                ...state,
                stores_arrival: payload.results.stores
            }
        case GET_STORES_BY_ARRIVAL_FAIL:
            return {
                ...state,
                stores_arrival: null
            }
        case GET_STORE_SUCCESS:
            return {
                ...state,
                store: payload.store
            }
        case GET_STORE_FAIL:
            return {
                ...state,
                store: null
            }
        case RELATED_STORES_SUCCESS:
            return {
                ...state,
                related_stores: payload.related_stores
            }
        case RELATED_STORES_FAIL:
            return {
                ...state,
                related_stores: null
            }
        case GET_STORE_LIST_CATEGORIES_SUCCESS:
            return {
                ...state,
                store_list_category: payload.results.store_list_category,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_STORE_LIST_CATEGORIES_FAIL:
            return {
                ...state,
                store_list_category: null,
                count: null,
                next: null,
                previous: null,
            }
        case SEARCH_STORES_SUCCESS:
            return {
                ...state,
                search_stores: payload.results.search_stores,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case SEARCH_STORES_FAIL:
            return {
                ...state,
                search_stores: null,
                count: null,
                next: null,
                previous: null
            }

        case GET_STORE_POLICIES_SUCCESS:
            return {
                ...state,
                policies: payload.policies
            }
        case GET_STORE_POLICIES_FAIL:
            return {
                ...state,
                policies: null
            }

        case SET_LOADING_STORE_LIKES_DISLIKE:
            return {
                ...state,
                loading_likes: true
            }
        case REMOVE_LOADING_STORE_LIKES_DISLIKE:
            return {
                ...state,
                loading_likes: false
            }

        case GET_STORE_LIKES_DISLIKE_SUCCESS:
            return {
                ...state,
                likes: payload
            }

        case GET_STORE_LIKES_DISLIKE_FAIL:
            return {
                ...state,
                likes: null,
            }


        case ADD_STORE_LIKES_DISLIKE_SUCCESS:
            return {
                ...state,
                likes: {
                    ...state.likes,
                    total_likes: payload.total_likes,
                    user_liked: payload.user_liked,
                }
            };
        case ADD_STORE_LIKES_DISLIKE_FAIL:
            console.log('Error en fallo:', error);
            return {
                ...state,
                likes: {
                    ...state.likes,
                    user_liked: false, // O el valor predeterminado que desees cuando hay un fallo
                }
            };

        case GET_STORES_LIKED_SUCCESS:
            return {
                ...state,
                stores_liked: payload
            };

        case GET_STORES_LIKED_FAIL:
            return {
                ...state,
                stores_liked: null
            }

        case SET_STORES_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_STORES_LOADING:
            return {
                ...state,
                loading: false
            }
                
                 
        default:
            return state

    }
}
