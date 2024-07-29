import { scheduleApi } from "@/api/scheduleApi";
import { IScheduleAction } from "@/interfaces/ISchedule";
import { createAsyncThunk } from "@reduxjs/toolkit";

const schedulesThunk = createAsyncThunk(
    "schedule/getAll",
    async (date: string, { rejectWithValue }) => {
        try{
            const res = await scheduleApi.get(date);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const scheduleCreateThunk = createAsyncThunk(
    "schedule/create",
    async (body: IScheduleAction, { rejectWithValue }) => {
        try{
            const res = await scheduleApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const scheduleDeleteThunk = createAsyncThunk(
    "schedule/delete",
    async (data: { date: string, doctor_id: string }, { rejectWithValue }) => {
        try{
            const res = await scheduleApi.delete(data.date, data.doctor_id);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { schedulesThunk, scheduleCreateThunk, scheduleDeleteThunk };