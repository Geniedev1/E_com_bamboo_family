import { createAsyncThunk } from "@reduxjs/toolkit";

import { HeaderResponse, OrderResponse, UserOrdersRequest } from "../../types/types";
import RequestService from "../../utils/request-service";
import {
    ADMIN_ORDER,
    ADMIN_ORDERS,
    ORDER
} from "../../constants/urlConstants";

export const fetchUserOrders = createAsyncThunk<HeaderResponse<OrderResponse>, number>(
    "orders/fetchUserOrders",
    async (page) => {
        const response = await RequestService.get(`${ORDER}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchAllUsersOrders = createAsyncThunk<HeaderResponse<OrderResponse>, number>(
    "orders/fetchAllUsersOrders",
    async (page) => {
        const response = await RequestService.get(`${ADMIN_ORDERS}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchUserOrdersByEmail = createAsyncThunk<HeaderResponse<OrderResponse>, UserOrdersRequest>(
    "orders/fetchUserOrdersByEmail",
    async ({ email, page }) => {
        const response = await RequestService.get(`${ADMIN_ORDER}/${email}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);
