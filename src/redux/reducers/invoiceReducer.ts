import { IInvoice } from "@/interfaces/IInvoice";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { invoiceEditThunk, invoicesThunk } from "../thunks/invoiceThunk";

interface IInvoiceState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: IInvoice[];
};

const initialState: IInvoiceState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(invoicesThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(invoicesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(invoicesThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(invoiceEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(invoiceEditThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(invoiceEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getInvoiceState = (state: RootState) => state.invoice;
export default invoiceSlice.reducer;