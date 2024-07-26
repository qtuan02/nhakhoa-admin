
import { appConfig } from "@/config/AppConfig";
import axiosClient from "@/config/AxiosConfig";
import { IChangepassword } from "@/interfaces/IChangepassword";
import { ILogin } from "@/interfaces/ILogin";
import { IResponse } from "@/interfaces/IResponse";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../store";
import { IProfile } from "@/interfaces/IProfile";
import { setCurrentUser } from "../reducers/authenticateReducer";

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
		const { currentUser } = store.getState().authenticate;

		const res = await axios.post(URL_AUTH+"/refresh", {}, {
            withCredentials: true
        });
        
		const newUser: IProfile = {
			...currentUser,
			access_token: res.data.data.access_token,
		};

		store.dispatch(setCurrentUser(newUser));
		return res.data.data.access_token;
	} catch (error: any) {
		TOAST_ERROR(error?.response?.data?.message);
		if (error.response.status === 401) {
			store.dispatch(logoutToken());
		}
	}
};
export const logoutToken = createAsyncThunk<IResponse>(
    "auth/logout",
    async () => {
        try {
            const res = await axiosClient.post(URL+"/logout");
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