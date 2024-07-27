import { serviceApi } from "@/api/serviceApi";
import { IService } from "@/interfaces/IService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const servicesThunk = createAsyncThunk(
    "service/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await serviceApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const serviceCreateThunk = createAsyncThunk(
    "service/create",
    async (body: IService, { rejectWithValue }) => {
        try{
            const res = await serviceApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const serviceDeleteThunk = createAsyncThunk(
    "service/delete",
    async (id: string, { rejectWithValue }) => {
        try{
            const res = await serviceApi.delete(id);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const serviceEditThunk = createAsyncThunk(
    "service/edit",
    async (data: { id: string, body: IService }, { rejectWithValue }) => {
        try{
            const res = await serviceApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);