import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import { PRODUCTS, REVIEW } from "../../constants/urlConstants";
import { FullProductResponse, ReviewResponse } from "../../types/types";

export const fetchProduct = createAsyncThunk<Partial<FullProductResponse>, string, { rejectValue: string }>(
    "product/fetchProduct",
    async (productId, thunkApi) => {
        try {
            const response = await RequestService.get(`${PRODUCTS}/${productId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchReviewsByProductId = createAsyncThunk<Array<ReviewResponse>, string>(
    "product/fetchReviewsByProductId",
    async (productId) => {
        const response = await RequestService.get(`${REVIEW}/${productId}`);
        return response.data;
    }
);
