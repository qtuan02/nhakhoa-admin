import { appConfig } from "@/commons/AppConfig";
import axiosClient from "@/commons/AxiosConfig";
import { TOAST_ERROR } from "@/commons/Option";
import { IResponse } from "@/interfaces/IResponse";
import { IService } from "@/interfaces/IService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = appConfig.API_LOCAL+'/v1/service';

export const getService = async (id: string) => {
    try {
        const res = await axiosClient.get(URL+ '/' +id);
        return res.data.data;   
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const getServices = createAsyncThunk<IResponse>(
    'service/get',
    async () => {
        try{
            const res = await axiosClient.get(URL);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const createService = createAsyncThunk<IResponse, IService>(
    'service/create',
    async (data) => {
        try{
            const res = await axiosClient.post(URL, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const deleteService = createAsyncThunk<IResponse, number>(
    'service/delete',
    async (id) => {
        try{
            const res = await axiosClient.delete(URL+ '/' +id);
            return {...res.data, data: id};
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const editService = createAsyncThunk<IResponse, { id: string, data: IService }>(
    'service/edit',
    async({ id, data }) => {
        try{
            const res = await axiosClient.put(URL+ '/' +id, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);