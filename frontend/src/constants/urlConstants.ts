export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
export const API_BASE_URL = BASE_URL + "/api/v1";
export const WEBSOCKET_URL = BASE_URL + "/websocket";

export const USER = "/user";
export const REGISTRATION = "/registration";
export const CART = "/cart";
export const PRODUCTS = "/products";

// admin
export const ADMIN_ADD = "/admin/add";
export const ADMIN_EDIT = "/admin/edit";
export const ADMIN_DELETE = "/admin/delete";
export const ADMIN_USER = "/admin/user";
export const ADMIN_USER_ALL = "/admin/user/all";
export const ADMIN_ORDER = "/admin/order";
export const ADMIN_ORDERS = "/admin/orders";

// auth
export const AUTH_LOGIN = "/auth/login";
export const AUTH_FORGOT = "/auth/forgot";
export const AUTH_RESET = "/auth/reset";
export const AUTH_EDIT_PASSWORD = "/auth/edit/password";
export const REGISTRATION_ACTIVATE = "/registration/activate";

// order
export const ORDER = "/order";

// review
export const REVIEW = "/review";

// user
export const USERS = "/users";
export const USERS_CART = "/users/cart";

// products
export const PRODUCTS_IDS = "/products/ids";
export const PRODUCTS_SEARCH = "/products/search";
export const PRODUCTS_SEARCH_TEXT = "/products/search/text";
