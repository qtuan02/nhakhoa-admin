import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { getOverview, getOverviewAppointment, getOverviewInvoice } from "../slices/overviewSlice";
import { IOverview, IOverviewAppoinment, IOverviewInvoice } from "@/interfaces/IOverview";

interface IOverviewState {
    loading: boolean;
    data?: IOverview[];
    loadingInvoice: boolean;
    dataInvoice?: IOverviewInvoice[];
    loadingAppointment: boolean;
    dataAppointment?: IOverviewAppoinment[];
};

const initialState: IOverviewState = {
    loading: false,
    data: [],
    loadingInvoice: false,
    dataInvoice: [],
    loadingAppointment: false,
    dataAppointment: [],
};

const overviewSlice = createSlice({
    name: "overview",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOverview.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOverview.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getOverview.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getOverviewInvoice.pending, (state) => {
                state.loadingInvoice = true;
            })
            .addCase(getOverviewInvoice.fulfilled, (state, action) => {
                state.loadingInvoice = false;
                state.dataInvoice = action.payload.data;
            })
            .addCase(getOverviewInvoice.rejected, (state, action: any) => {
                state.dataInvoice = [];
                state.loadingInvoice = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getOverviewAppointment.pending, (state) => {
                state.loadingAppointment = true;
            })
            .addCase(getOverviewAppointment.fulfilled, (state, action) => {
                state.loadingAppointment = false;
                state.dataAppointment = action.payload.data;
            })
            .addCase(getOverviewAppointment.rejected, (state, action: any) => {
                state.dataAppointment = [];
                state.loadingAppointment = false;
                TOAST_ERROR(action.error?.message)
            })
    }
});

export const getOverviewState = (state: RootState) => state.overview;
export default overviewSlice.reducer;