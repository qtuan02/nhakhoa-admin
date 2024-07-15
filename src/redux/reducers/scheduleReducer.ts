import { createSlice } from "@reduxjs/toolkit";
import { getSchedules } from "@/apis";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { ISchedule } from "@/interfaces/ISchedule";

interface IScheduleState {
    loading?: boolean;
    status?: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: ISchedule[];
};

const initialState: IScheduleState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: []
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSchedules.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getSchedules.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getSchedules.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
    }
});

export default scheduleSlice.reducer;