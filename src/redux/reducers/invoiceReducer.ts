import { getInvoices } from "@/apis";
import { IInvoice } from "@/interfaces/IInvoice";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { createSlice } from "@reduxjs/toolkit";

interface IInvoiceState {
    loading?: boolean;
    status?: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: IInvoice[];
};

const initialState: IInvoiceState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: []
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvoices.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getInvoices.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
    }
});

export default invoiceSlice.reducer;