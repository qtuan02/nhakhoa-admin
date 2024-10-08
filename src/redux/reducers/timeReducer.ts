import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { ITime } from "@/interfaces/IAppointment";
import { timesThunk } from "../thunks/timeThunk";

interface ITimeState {
    loading: boolean;
    status: "pending" | "completed";
    data?: ITime[];
};

const initialState: ITimeState = {
    loading: false,
    status: "completed",
    data: [],
};

const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(timesThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(timesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(timesThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getTimeState = (state: RootState) => state.time;
export default timeSlice.reducer;