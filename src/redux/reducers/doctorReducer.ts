import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { IUser } from "@/interfaces/IUser";
import { RootState } from "../store";
import { doctorsThunk } from "../thunks/doctorThunk";

interface IDoctorState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: IUser[];
};

const initialState: IDoctorState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
};

const doctorSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(doctorsThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(doctorsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(doctorsThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getDoctorState = (state: RootState) => state.doctor;
export default doctorSlice.reducer;