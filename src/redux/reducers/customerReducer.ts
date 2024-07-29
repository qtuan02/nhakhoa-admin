import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ICustomer } from "@/interfaces/ICustomer";
import { RootState } from "../store";
import { customerCreateThunk, customerEditThunk, customersThunk } from "../thunks/customerThunk";

interface ICustomerState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: ICustomer[];
};

const initialState: ICustomerState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(customersThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(customersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(customersThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload);
            })
            .addCase(customerCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(customerCreateThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(customerCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload);
            })
            .addCase(customerEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(customerEditThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(customerEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload);
            });
    }
});

export const getCustomerState = (state: RootState) => state.customer;
export default customerSlice.reducer;