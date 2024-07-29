import { historyApi } from "@/api/historyApi";
import { IHistory } from "@/interfaces/IHistory";
import { createAsyncThunk } from "@reduxjs/toolkit";

const historiesThunk = createAsyncThunk(
    "history/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await historyApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const historyCreateThunk = createAsyncThunk(
    "history/create",
    async (body: IHistory, { rejectWithValue }) => {
        try{
            const res = await historyApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const historyEditThunk = createAsyncThunk(
    "history/edit",
    async (data: { id: string, body: IHistory }, { rejectWithValue }) => {
        try{
            const res = await historyApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { historiesThunk, historyCreateThunk, historyEditThunk };