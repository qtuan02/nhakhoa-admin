import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ICustomer } from "@/interfaces/ICustomer";
import { RootState } from "../store";
import { createCustomer, editCustomer, getCustomers } from "../slices/customerSlice";

interface ICustomerState {
    loading: boolean;
    status: 'pending' | 'completed' | 'rejected';
    edit: 'wait' | 'success' | 'fail';
    data?: ICustomer[];
    drawer: boolean;
    history_id?: string;
};

const initialState: ICustomerState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: [],
    drawer: false,
    history_id: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        setHistoryId: (state, action: PayloadAction<string>) => {
            state.history_id = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getCustomers.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                state.status = 'rejected';
                TOAST_ERROR(action.error?.message);
            })
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.status = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createCustomer.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message);
            })
            .addCase(editCustomer.pending, (state) => {
                state.edit = 'wait';
            })
            .addCase(editCustomer.fulfilled, (state, action) => {
                state.status = 'completed';
                state.edit = 'success';
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editCustomer.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.edit = 'fail';
                TOAST_ERROR(action.error?.message);
            });
    }
});

export const getCustomerState = (state: RootState) => state.customer;
export const { toggleDrawer, setHistoryId } = customerSlice.actions;
export default customerSlice.reducer;