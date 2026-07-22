import { RootState } from "../../store";
import { Category } from "../../types/types";

export const selectCategories = (state: RootState): Category[] => state.category.categories;
export const selectCategoriesLoading = (state: RootState): boolean => state.category.loading;
export const selectCategoryError = (state: RootState): string | null => state.category.error;
