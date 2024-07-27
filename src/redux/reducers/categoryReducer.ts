import { ICategory } from "@/interfaces/ICategory";
import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { categoriesThunk, categoryCreateThunk, categoryDeleteThunk, categoryEditThunk } from "../thunks/categoryThunk";

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
            .addCase(categoriesThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(categoriesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(categoriesThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(categoryCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryCreateThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(categoryCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload);
            })
            .addCase(categoryDeleteThunk.fulfilled, (state, action) => {
                state.data = state.data?.filter(item => item.id !== action.payload.data.id);
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(categoryDeleteThunk.rejected, (state, action) => {
                state.status = "rejected";
                TOAST_ERROR(action?.payload);
            })
            .addCase(categoryEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(categoryEditThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(categoryEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload);
            });
    },
});

export const getCategoryState = (state: RootState) => state.category;
export default categorySlice.reducer;