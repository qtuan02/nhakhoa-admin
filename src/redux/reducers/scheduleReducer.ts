import { createSlice } from "@reduxjs/toolkit";
import { createSchedule, deleteSchedule, getSchedules } from "@/apis";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ISchedule, IScheduleDoctor } from "@/interfaces/ISchedule";

interface IScheduleState {
    loading: boolean;
    status: 'pending' | 'completed' | 'rejected';
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
            .addCase(createSchedule.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.status = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createSchedule.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(deleteSchedule.fulfilled, (state, action: any) => {
                const { date, doctor_id } = action.payload.data;
                state.data = state.data.map((s: ISchedule) => ({
                    ...s,
                    doctor: s?.doctor?.filter((d: IScheduleDoctor) => d.id !== doctor_id)
                }));
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(deleteSchedule.rejected, (state, action: any) => {
                state.status = 'rejected';
                TOAST_ERROR(action.error?.message);
            })
    }
});

export default scheduleSlice.reducer;