import axiosClient from "@/config/AxiosConfig";
import { IResponse } from "@/interfaces/IResponse";
import { IScheduleAction } from "@/interfaces/ISchedule";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "/v1/schedule";

export const getDate = createAsyncThunk<IResponse, string>(
    "schedule/getDate",
    async (doctor_id) => {
        try{
            const res = await axiosClient.get(URL+"/"+doctor_id);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const getTime = createAsyncThunk<IResponse, { doctor_id: string, date: string }>(
    "schedule/getTime",
    async ({ doctor_id, date }) => {
        try{
            const res = await axiosClient.get(URL+"/"+doctor_id+"/"+date);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const getSchedules = createAsyncThunk<IResponse, string>(
    "schedule/get",
    async (date) => {
        try{
            const res = await axiosClient.get(URL+"?date="+date);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const createSchedule = createAsyncThunk<IResponse, IScheduleAction>(
    "schedule/create",
    async (data) => {
        try{
            const res = await axiosClient.post(URL, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const deleteSchedule = createAsyncThunk<IResponse, { doctor_id: string, date: string }>(
    "schedule/delete",
    async ({ doctor_id, date }) => {
        try{
            const res = await axiosClient.delete(URL+"/"+doctor_id+"/"+date);
            return {...res.data, data: { date: date, doctor_id: doctor_id }};
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);