import { createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/types";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "./category-thunks";

export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

export const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null
};

const sortCategories = (a: Category, b: Category): number =>
    (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name);

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        resetCategoryError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories = [...state.categories, action.payload].sort(sortCategories);
            state.error = null;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload ?? "Có lỗi xảy ra";
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.categories = state.categories
                .map((category) => (category.id === action.payload.id ? action.payload : category))
                .sort(sortCategories);
            state.error = null;
        });
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.error = action.payload ?? "Có lỗi xảy ra";
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload);
            state.error = null;
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.error = action.payload ?? "Không thể xóa danh mục";
        });
    }
});

export const { resetCategoryError } = categorySlice.actions;
export default categorySlice.reducer;
