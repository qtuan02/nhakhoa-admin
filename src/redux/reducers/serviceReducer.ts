import { IService } from "@/interfaces/IService";
import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { serviceCreateThunk, serviceDeleteThunk, serviceEditThunk, servicesThunk } from "../thunks/serviceThunk";

interface IServiceState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: IService[];
};

const initialState: IServiceState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: []
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(servicesThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(servicesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(servicesThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(serviceCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(serviceCreateThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(serviceCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(serviceDeleteThunk.fulfilled, (state, action) => {
                state.data = state.data?.filter((item) => item.id !== action.payload.data.id);
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(serviceDeleteThunk.rejected, (state, action) => {
                state.status = "rejected";
                TOAST_ERROR(action?.payload);
            })
            .addCase(serviceEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(serviceEditThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(serviceEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getServiceState = (state: RootState) => state.service;
export default serviceSlice.reducer;