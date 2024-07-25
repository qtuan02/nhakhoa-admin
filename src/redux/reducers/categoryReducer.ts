import { ICategory } from "@/interfaces/ICategory";
import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { createCategory, deleteCategory, editCategory, getCategories } from "../slices/categorySlice";

interface ICategoryState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: ICategory[];
}

const initialState: ICategoryState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getCategories.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createCategory.rejected, (state, action: any) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action.error?.message);
            })
            .addCase(deleteCategory.fulfilled, (state, action: any) => {
                state.data = state.data?.filter(
                    (item) => item.id !== action.payload.data
                );
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(deleteCategory.rejected, (state, action: any) => {
                state.status = "rejected";
                TOAST_ERROR(action.error?.message);
            })
            .addCase(editCategory.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editCategory.rejected, (state, action: any) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action.error?.message);
            });
    },
});

export const getCategoryState = (state: RootState) => state.category;
export default categorySlice.reducer;