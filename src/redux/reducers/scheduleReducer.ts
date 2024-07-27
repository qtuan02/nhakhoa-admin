import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ISchedule, IScheduleDoctor } from "@/interfaces/ISchedule";
import { RootState } from "../store";
import { scheduleCreateThunk, scheduleDeleteThunk, schedulesThunk } from "../thunks/scheduleThunk";

interface IScheduleState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: ISchedule[];
};

const initialState: IScheduleState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: []
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(schedulesThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(schedulesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(schedulesThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(scheduleCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(scheduleCreateThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(scheduleCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(scheduleDeleteThunk.fulfilled, (state, action) => {
                state.data = state.data?.map((s: ISchedule) => ({
                    ...s,
                    doctor: s?.doctor?.filter((d: IScheduleDoctor) => d.id !== action.payload.data.doctor_id)
                }));
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(scheduleDeleteThunk.rejected, (state, action) => {
                state.status = "rejected";
                TOAST_ERROR(action?.payload);
            })
    }
});

export const getScheduleState = (state: RootState) => state.schedule;
export default scheduleSlice.reducer;