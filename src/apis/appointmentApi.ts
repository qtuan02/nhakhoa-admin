import axiosClient from "@/config/AxiosConfig";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { IAppointment } from "@/interfaces/IAppointment";
import { IResponse } from "@/interfaces/IResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL_TIME = "/v1/time";
const URL_APPOINTMENT = '/v1/appointment';

export const getTimes = createAsyncThunk<IResponse>(
    'appointment/getTimes',
    async () => {
        try{
            const res = await axiosClient.get(URL_TIME);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const getAppointment = async (id: string) => {
    try {
        const res = await axiosClient.get(URL_APPOINTMENT+ '/' +id);
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const getAppointments = createAsyncThunk<IResponse>(
    'appointment/get',
    async () => {
        try{
            const res = await axiosClient.get(URL_APPOINTMENT);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const createAppointment = createAsyncThunk<IResponse, IAppointment>(
    'appointment/create',
    async (data) => {
        try{
            const res = await axiosClient.post(URL_APPOINTMENT, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const deleteAppointment = createAsyncThunk<IResponse, number>(
    'appointment/delete',
    async (id) => {
        try{
            const res = await axiosClient.delete(URL_APPOINTMENT+ '/' +id);
            return {...res.data, data: id};
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const editAppointment = createAsyncThunk<IResponse, { id: string, data: IAppointment }>(
    'appointment/edit',
    async({ id, data }) => {
        try{
            const res = await axiosClient.put(URL_APPOINTMENT+ '/' +id, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);