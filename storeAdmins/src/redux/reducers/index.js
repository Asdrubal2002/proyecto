import { combineReducers } from "redux";

import Auth from "./auth/auth";
import Alert from "./alert/alert";
import Store_Categories from "./categories_stores/store_categories";
import Cities from "./cities/cities";
import Store_create from "./stores/store";



export default combineReducers ({
    Alert,
    Auth,
    Store_Categories,
    Cities,
    Store_create,
})