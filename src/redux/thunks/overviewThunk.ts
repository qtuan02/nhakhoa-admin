import { overviewApi } from "@/api/overviewApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const overviewsThunk = createAsyncThunk(
    "overview/getOverview",
    async(_, { rejectWithValue }) => {
        try{
            const res = await overviewApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const overviewInvoiceThunk = createAsyncThunk(
    "overview/getInvoice",
    async(_, { rejectWithValue }) => {
        try{
            const res = await overviewApi.getInvoice();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const overviewAppointmentThunk = createAsyncThunk(
    "overview/getAppointment",
    async(_, { rejectWithValue }) => {
        try{
            const res = await overviewApi.getAppointment();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { overviewsThunk, overviewInvoiceThunk, overviewAppointmentThunk };