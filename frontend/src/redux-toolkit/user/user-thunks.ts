import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    AuthErrors,
    ReviewError,
    ReviewRequest,
    UserEditErrors,
    UserEditRequest,
    UserResetPasswordRequest,
    UserResponse
} from "../../types/types";
import RequestService from "../../utils/request-service";
import { AUTH_EDIT_PASSWORD, REVIEW, USERS } from "../../constants/urlConstants";

export const fetchUserInfo = createAsyncThunk<UserResponse>("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS, true);
    return response.data;
});

export const updateUserInfo = createAsyncThunk<UserResponse, UserEditRequest, { rejectValue: UserEditErrors }>(
    "user/updateUserInfo",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(USERS, request, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPassword = createAsyncThunk<string, UserResetPasswordRequest, { rejectValue: AuthErrors }>(
    "user/updateUserPassword",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(AUTH_EDIT_PASSWORD, request, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const addReviewToProduct = createAsyncThunk<{}, ReviewRequest, { rejectValue: ReviewError }>(
    "user/addReviewToProduct",
    async (request, thunkApi) => {
        try {
            return await RequestService.post(REVIEW, request);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
