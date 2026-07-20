import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {
    PRODUCTS,
    PRODUCTS_IDS,
    PRODUCTS_SEARCH,
    PRODUCTS_SEARCH_TEXT
} from "../../constants/urlConstants";
import { FilterParamsType, HeaderResponse, ProductResponse, ProductsSearchRequest } from "../../types/types";

export const fetchProducts = createAsyncThunk<HeaderResponse<ProductResponse>, number>(
    "products/fetchProducts",
    async (page) => {
        const response = await RequestService.get(`${PRODUCTS}?page=${page}`);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchProductsByIds = createAsyncThunk<Array<ProductResponse>, Array<number>>(
    "products/fetchProductsByIds",
    async (ids) => {
        const response = await RequestService.post(PRODUCTS_IDS, ids);
        return response.data;
    }
);

export const fetchProductsByFilterParams = createAsyncThunk<HeaderResponse<ProductResponse>, FilterParamsType>(
    "products/fetchProductsByFilterParams",
    async (filter) => {
        const response = await RequestService.post(`${PRODUCTS_SEARCH}?page=${filter.currentPage}`, filter);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchProductsByInputText = createAsyncThunk<HeaderResponse<ProductResponse>, ProductsSearchRequest>(
    "products/fetchProductsByInputText",
    async (data) => {
        const response = await RequestService.post(`${PRODUCTS_SEARCH_TEXT}?page=${data.currentPage}`, data);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);
