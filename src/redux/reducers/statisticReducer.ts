import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { IStatisticAppointment, IStatisticHistory, IStatisticInvoice, IStatisticService } from "@/interfaces/IStatistic";
import { statisticAppointmentThunk, statisticHistoryThunk, statisticInvoiceThunk, statisticServiceThunk } from "../thunks/statisticThunk";

interface IStatisticState {
    loadingInvoice: boolean;
    dataInvoice?: IStatisticInvoice | null;
    loadingService: boolean;
    dataService?: IStatisticService | null;
    loadingAppointment: boolean;
    dataAppointment?: IStatisticAppointment | null;
    loadingHistory: boolean;
    dataHistory?: IStatisticHistory | null;
};

const initialState: IStatisticState = {
    loadingInvoice: false,
    dataInvoice: null,
    loadingService: false,
    dataService: null,
    loadingAppointment: false,
    dataAppointment: null,
    loadingHistory: false,
    dataHistory: null,
};

const statisticSlice = createSlice({
    name: "statistic",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(statisticInvoiceThunk.pending, (state) => {
                state.loadingInvoice = true;
            })
            .addCase(statisticInvoiceThunk.fulfilled, (state, action) => {
                state.loadingInvoice = false;
                state.dataInvoice = action.payload.data;
            })
            .addCase(statisticInvoiceThunk.rejected, (state, action) => {
                state.dataInvoice = null;
                state.loadingInvoice = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(statisticServiceThunk.pending, (state) => {
                state.loadingService = true;
            })
            .addCase(statisticServiceThunk.fulfilled, (state, action) => {
                state.loadingService = false;
                state.dataService = action.payload.data;
            })
            .addCase(statisticServiceThunk.rejected, (state, action) => {
                state.dataService = null;
                state.loadingService = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(statisticAppointmentThunk.pending, (state) => {
                state.loadingAppointment = true;
            })
            .addCase(statisticAppointmentThunk.fulfilled, (state, action) => {
                state.loadingAppointment = false;
                state.dataAppointment = action.payload.data;
            })
            .addCase(statisticAppointmentThunk.rejected, (state, action) => {
                state.dataAppointment = null;
                state.loadingAppointment = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(statisticHistoryThunk.pending, (state) => {
                state.loadingHistory = true;
            })
            .addCase(statisticHistoryThunk.fulfilled, (state, action) => {
                state.loadingHistory = false;
                state.dataHistory = action.payload.data;
            })
            .addCase(statisticHistoryThunk.rejected, (state, action) => {
                state.dataHistory = null;
                state.loadingHistory = false;
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getStatisticState = (state: RootState) => state.statistic;
export default statisticSlice.reducer;