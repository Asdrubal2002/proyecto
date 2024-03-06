import { combineReducers } from "redux";

import Auth from "./auth/auth";
import Alert from "./alert/alert";

export default combineReducers ({
    Alert,
    Auth,
})