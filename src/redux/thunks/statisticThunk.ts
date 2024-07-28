;import { statisticsApi } from "@/api/statisticApi";
import { IStatisticAction } from "@/interfaces/IStatistic";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const statisticInvoiceThunk = createAsyncThunk(
    "statistic/invoice",
    async(data: IStatisticAction, { rejectWithValue }) => {
        try{
            const res = await statisticsApi.getInvoice(data.begin, data.end);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const statisticServiceThunk = createAsyncThunk(
    "statistic/service",
    async(data: IStatisticAction, { rejectWithValue }) => {
        try{
            const res = await statisticsApi.getService(data.begin, data.end);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const statisticAppointmentThunk = createAsyncThunk(
    "statistic/appointment",
    async(data: IStatisticAction, { rejectWithValue }) => {
        try{
            const res = await statisticsApi.getAppointment(data.begin, data.end);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const statisticHistoryThunk = createAsyncThunk(
    "statistic/history",
    async(data: IStatisticAction, { rejectWithValue }) => {
        try{
            const res = await statisticsApi.getHistory(data.begin, data.end);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);