import { customerApi } from "@/api/customerApi";
import { ICustomer } from "@/interfaces/ICustomer";
import { createAsyncThunk } from "@reduxjs/toolkit";

const customersThunk = createAsyncThunk(
    "customer/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await customerApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const customerCreateThunk = createAsyncThunk(
    "customer/create",
    async (body: ICustomer, { rejectWithValue }) => {
        try{
            const res = await customerApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const customerEditThunk = createAsyncThunk(
    "customer/edit",
    async (data: { id: string, body: ICustomer }, { rejectWithValue }) => {
        try{
            const res = await customerApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { customersThunk, customerCreateThunk, customerEditThunk };