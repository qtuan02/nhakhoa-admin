import axiosClient from "@/commons/AxiosConfig";
import { IChangepassword } from "@/interfaces/IChangepassword";
import { ILogin } from "@/interfaces/ILogin";
import { IResponse } from "@/interfaces/IResponse";
import { logout } from "@/redux/reducers/authReducer";
import store from "@/redux/store";
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

export const refresh = async () => {
    try {
        const res = await axiosClient.post(URL+ '/refresh');
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        if (error.response.status === 401) {
			store.dispatch(logout());
		}
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

export const changePasswordWithToken = async (data: IChangepassword) => {
    try {
        const res = await axiosClient.post(URL+ '/change-password', data);
        return res.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};