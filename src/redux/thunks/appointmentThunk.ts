import { appointmentApi } from "@/api/appointmentApi";
import { IAppointment } from "@/interfaces/IAppointment";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const appointmentsThunk = createAsyncThunk(
    "appointment/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await appointmentApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const appointmentCreateThunk = createAsyncThunk(
    "appointment/create",
    async (body: IAppointment, { rejectWithValue }) => {
        try{
            const res = await appointmentApi.create(body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const appointmentDeleteThunk = createAsyncThunk(
    "appointment/delete",
    async (id: string, { rejectWithValue }) => {
        try{
            const res = await appointmentApi.delete(id);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const appointmentEditThunk = createAsyncThunk(
    "appointment/edit",
    async (data: { id: string, body: IAppointment }, { rejectWithValue }) => {
        try{
            const res = await appointmentApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);