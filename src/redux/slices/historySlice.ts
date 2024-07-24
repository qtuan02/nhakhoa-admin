import axiosClient from "@/config/AxiosConfig";
import { IHistory } from "@/interfaces/IHistory";
import { IResponse } from "@/interfaces/IResponse";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = '/v1/history';

export const getHistory = async (id: string) => {
    try {
        const res = await axiosClient.get(URL+ '/' +id);
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const getHistories = createAsyncThunk<IResponse>(
    'history/get',
    async () => {
        try{
            const res = await axiosClient.get(URL);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const createHistory = createAsyncThunk<IResponse, IHistory>(
    'history/create',
    async (data) => {
        try{
            const res = await axiosClient.post(URL, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const editHistory = createAsyncThunk<IResponse, { id: string, data: IHistory }>(
    'history/edit',
    async({ id, data }) => {
        try{
            const res = await axiosClient.put(URL+ '/' +id, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);