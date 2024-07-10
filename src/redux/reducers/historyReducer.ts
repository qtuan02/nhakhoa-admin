import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { IHistory } from "@/interfaces/IHistory";
import { createHistory, editHistory, getHistories } from "@/apis";

interface IHistoryState {
    loading?: boolean;
    status?: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: IHistory[];
};

const initialState: IHistoryState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: []
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistories.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getHistories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getHistories.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(createHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createHistory.fulfilled, (state, action) => {
                state.status = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createHistory.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(editHistory.pending, (state) => {
                state.edit = 'wait';
            })
            .addCase(editHistory.fulfilled, (state, action) => {
                state.status = 'completed';
                state.edit = 'success';
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editHistory.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.edit = 'fail';
                TOAST_ERROR(action.error?.message)
            })
    }
});

export default historySlice.reducer;