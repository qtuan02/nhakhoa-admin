import { categoryApi } from "@/api/categoryApi";
import { ICategory } from "@/interfaces/ICategory";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const categoriesThunk = createAsyncThunk(
    "category/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await categoryApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const categoryCreateThunk = createAsyncThunk(
    "category/create",
    async (body: ICategory, { rejectWithValue }) => {
        try{
            const res = await categoryApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const categoryDeleteThunk = createAsyncThunk(
    "category/delete",
    async (id: string, { rejectWithValue }) => {
        try{
            const res = await categoryApi.delete(id);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const categoryEditThunk = createAsyncThunk(
    "category/edit",
    async (data: { id: string, body: ICategory }, { rejectWithValue }) => {
        try{
            const res = await categoryApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);