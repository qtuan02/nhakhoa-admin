import { appConfig } from "@/commons/AppConfig";
import axiosClient from "@/commons/AxiosConfig";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { IUser } from "@/interfaces/IUser";
import { IResponse } from "@/interfaces/IResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = appConfig.API_LOCAL+'/v1/user';

export const getDoctors = async () => {
    try {
        const res = await axiosClient.get(URL+ '?role_id=1');
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return [];
    }
};

export const getUser = async (id: string) => {
    try {
        const res = await axiosClient.get(URL+ '/' +id);
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const changePassword = async (id: string, password: string) => {
    try {
        const res = await axiosClient.put(URL+ '/' +id, { password: password });
        return res.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
}

export const getUsers = createAsyncThunk<IResponse>(
    'user/get',
    async () => {
        try{
            const res = await axiosClient.get(URL);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const createUser = createAsyncThunk<IResponse, IUser>(
    'user/create',
    async (data) => {
        try{
            const res = await axiosClient.post(URL, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const editUser = createAsyncThunk<IResponse, { id: string, data: IUser }>(
    'user/edit',
    async({ id, data }) => {
        try{
            const res = await axiosClient.put(URL+ '/' +id, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);