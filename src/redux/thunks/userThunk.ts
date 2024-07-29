import { userApi } from "@/api/userApi";
import { IUser } from "@/interfaces/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";

const usersThunk = createAsyncThunk(
    "user/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await userApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const userCreateThunk = createAsyncThunk(
    "user/create",
    async (body: IUser, { rejectWithValue }) => {
        try{
            const res = await userApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const userEditThunk = createAsyncThunk(
    "user/edit",
    async (data: { id: string, body: IUser }, { rejectWithValue }) => {
        try{
            const res = await userApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { usersThunk, userCreateThunk, userEditThunk };