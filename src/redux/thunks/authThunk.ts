import { authApi } from "@/api/authenticateApi";
import { ILogin } from "@/interfaces/ILogin";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginThunk = createAsyncThunk(
    "auth/login",
    async(body: ILogin, { rejectWithValue }) => {
        try{
            const res = await authApi.login(body);
            return res.data;
        }catch(error: any) {            
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const logoutThunk = createAsyncThunk(
    "auth/logout",
    async(_, { rejectWithValue }) => {
        try{
            const res = await authApi.logout();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { loginThunk, logoutThunk };