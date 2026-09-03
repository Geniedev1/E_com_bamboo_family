import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import { CATEGORIES } from "../../constants/urlConstants";
import { Category, CategoryRequest } from "../../types/types";

export const fetchCategories = createAsyncThunk<Category[]>("category/fetchCategories", async () => {
    const response = await RequestService.get(CATEGORIES);
    return response.data;
});

export const createCategory = createAsyncThunk<Category, CategoryRequest, { rejectValue: string }>(
    "category/createCategory",
    async (data, thunkApi) => {
        try {
            const response = await RequestService.post(CATEGORIES, data, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Không thể tạo danh mục");
        }
    }
);

export const updateCategory = createAsyncThunk<Category, { id: number; data: CategoryRequest }, { rejectValue: string }>(
    "category/updateCategory",
    async ({ id, data }, thunkApi) => {
        try {
            const response = await RequestService.put(`${CATEGORIES}/${id}`, data, true);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Không thể cập nhật danh mục");
        }
    }
);

export const deleteCategory = createAsyncThunk<number, number, { rejectValue: string }>(
    "category/deleteCategory",
    async (id, thunkApi) => {
        try {
            await RequestService.delete(`${CATEGORIES}/${id}`, true);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Không thể xóa danh mục");
        }
    }
);
