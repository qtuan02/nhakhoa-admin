
import { appConfig } from "@/config/AppConfig";
import axiosClient from "@/config/AxiosConfig";
import { IChangepassword } from "@/interfaces/IChangepassword";
import { ILogin } from "@/interfaces/ILogin";
import { IResponse } from "@/interfaces/IResponse";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../reducers/authenticateReducer";
import store from "../store";

const URL = "/v1/auth";
const URL_AUTH = appConfig.API_LOCAL+"/v1/auth";

export const login = createAsyncThunk<IResponse, ILogin>(
    "auth/login",
    async (data) => {
        try {
            const res = await axios.post(URL_AUTH+"/login", data, {
                withCredentials: true
            });
            return res.data;
        } catch(error: any) {
            throw error?.response?.data;
        }
    }
);


export const refreshToken = async () => {
    try {
        const res = await axios.post(URL_AUTH+"/refresh", null, {
            withCredentials: true
        });
        return res.data.data;
    }catch(error: any) {
        if(error.response.status === 401){
            TOAST_ERROR(error?.response?.data?.message);
            store.dispatch(logout());
        }
    }
};

export const profile = createAsyncThunk<IResponse>(
    "auth/profile",
    async () => {
        try {
            const res = await axiosClient.get(URL + "/profile");
            return res.data;
        } catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const changePasswordWithToken = async (data: IChangepassword) => {
    try {
        const res = await axiosClient.post(URL+ "/change-password", data);
        return res.data;
    } catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};