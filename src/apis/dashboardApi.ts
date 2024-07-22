import axiosClient from "@/config/AxiosConfig";
import { IResponse } from "@/interfaces/IResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL_1 = '/v1/overview';
const URL_2 = '/v1/overview/invoice';
const URL_3 = '/v1/overview/appointment';


export const getOverview = createAsyncThunk<IResponse>(
    'overview/get',
    async () => {
        try{
            const res = await axiosClient.get(URL_1);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const getOverviewInvoice = createAsyncThunk<IResponse>(
    'overview/getInvoice',
    async () => {
        try{
            const res = await axiosClient.get(URL_2);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const getOverviewAppointment = createAsyncThunk<IResponse>(
    'overview/getAppointment',
    async () => {
        try{
            const res = await axiosClient.get(URL_3);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);