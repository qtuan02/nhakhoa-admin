import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { IOverview, IOverviewAppoinment, IOverviewInvoice } from "@/interfaces/IOverview";
import { overviewAppointmentThunk, overviewInvoiceThunk, overviewsThunk } from "../thunks/overviewThunk";

interface IOverviewState {
    loading: boolean;
    status: "pending" | "completed";
    data?: IOverview[];
    loadingInvoice: boolean;
    statusInvoice: "pending" | "completed";
    dataInvoice?: IOverviewInvoice[];
    loadingAppointment: boolean;
    statusAppointment: "pending" | "completed";
    dataAppointment?: IOverviewAppoinment[];
};

const initialState: IOverviewState = {
    loading: false,
    status: "completed",
    data: [],
    loadingInvoice: false,
    statusInvoice: "completed",
    dataInvoice: [],
    loadingAppointment: false,
    statusAppointment: "completed",
    dataAppointment: [],
};

const overviewSlice = createSlice({
    name: "overview",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(overviewsThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(overviewsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(overviewsThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(overviewInvoiceThunk.pending, (state) => {
                state.statusInvoice = "pending";
                state.loadingInvoice = true;
            })
            .addCase(overviewInvoiceThunk.fulfilled, (state, action) => {
                state.loadingInvoice = false;
                state.dataInvoice = action.payload.data;
            })
            .addCase(overviewInvoiceThunk.rejected, (state, action) => {
                state.dataInvoice = [];
                state.loadingInvoice = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(overviewAppointmentThunk.pending, (state) => {
                state.statusAppointment = "pending";
                state.loadingAppointment = true;
            })
            .addCase(overviewAppointmentThunk.fulfilled, (state, action) => {
                state.loadingAppointment = false;
                state.dataAppointment = action.payload.data;
            })
            .addCase(overviewAppointmentThunk.rejected, (state, action) => {
                state.dataAppointment = [];
                state.loadingAppointment = false;
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getOverviewState = (state: RootState) => state.overview;
export default overviewSlice.reducer;