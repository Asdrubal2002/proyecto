import { combineReducers } from "redux";

import Auth from "./auth/auth";
import Alert from "./alert/alert";
import Store_Categories from "./categories_stores/store_categories";
import Cities from "./cities/cities";
import Store from "./stores/store";
import Profile from "./profile/profile";
import Product_category from "./categories_product/Product_categories";
import Products from "./products/products";
import Shippings_store from "./shippings/shippings";
import Products_ByCategory from "./products/products_by_category";
import Comments_Store from "./comments/comments_store";
import Partners_store from "./users-store/users";
import Invoices from "./invoices/invoices";



export default combineReducers({
    Alert,
    Auth,
    Profile,
    Store_Categories,
    Cities,
    Store,
    Product_category,
    Products_ByCategory,
    Products,
    Shippings_store,
    Comments_Store,
    Partners_store,
    Invoices

})