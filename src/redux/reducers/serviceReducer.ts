import { IService } from "@/interfaces/IService";
import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/commons/Option";
import { createService, deleteService, editService, getService, getServices } from "../../apis";


interface IServiceState {
    loading?: boolean;
    status?: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: IService[];
};

const initialState: IServiceState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: []
};

const serviceSlice = createSlice({
    name:'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getServices.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(createService.pending, (state) => {
                state.loading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.status = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createService.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(deleteService.fulfilled, (state, action: any) => {
                state.data = state.data.filter((item) => item.id !== action.payload.data);
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(deleteService.rejected, (state, action: any) => {
                state.status = 'rejected';
                TOAST_ERROR(action.error?.message);
            })
            .addCase(editService.pending, (state) => {
                state.edit = 'wait';
            })
            .addCase(editService.fulfilled, (state, action) => {
                state.status = 'completed';
                state.edit = 'success';
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editService.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.edit = 'fail';
                TOAST_ERROR(action.error?.message)
            })
    }
});

export default serviceSlice.reducer;