import { notificationApi } from "@/api/notificationApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const notificationsThunk = createAsyncThunk(
    "notification/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await notificationApi.get();
            return res.data;
        } catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const notificationEditThunk = createAsyncThunk(
    "notification/edit",
    async(id: string, { rejectWithValue }) => {
        try{
            const res = await notificationApi.edit(id);
            return res.data;
        } catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export { notificationsThunk, notificationEditThunk };