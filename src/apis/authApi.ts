import axiosClient from "@/commons/AxiosConfig";
import { ILogin } from "@/interfaces/ILogin";
import { IResponse } from "@/interfaces/IResponse";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = '/v1/auth';

export const login = async (data: ILogin) => {
    try {
        const res = await axiosClient.post(URL+ '/login', data, {
            withCredentials: true
        });
        return res.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const profile = createAsyncThunk<IResponse>(
    'auth/profile',
    async () => {
        try{
            const res = await axiosClient.get(URL + '/profile');
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);