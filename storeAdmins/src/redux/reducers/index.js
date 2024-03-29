import { combineReducers } from "redux";

import Auth from "./auth/auth";
import Alert from "./alert/alert";
import Store_Categories from "./categories_stores/store_categories";
import Cities from "./cities/cities";
import Store from "./stores/store";
import Profile from "./profile/profile";
import Product_category from "./categories_product/Product_categories";
import Products from "./products/products";


export default combineReducers ({
    Alert,
    Auth,
    Profile,
    Store_Categories,
    Cities,
    Store,
    Product_category,
    Products
})