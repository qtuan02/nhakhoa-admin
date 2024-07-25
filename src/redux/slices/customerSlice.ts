import axiosClient from "@/config/AxiosConfig";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { ICustomer } from "@/interfaces/ICustomer";
import { IResponse } from "@/interfaces/IResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "/v1/customer";

export const getCustomer = async (id: string) => {
    try {
        const res = await axiosClient.get(URL+ "/" +id);
        return res.data.data;
    } catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const getCustomers = createAsyncThunk<IResponse>(
    "customer/get",
    async () => {
        try {
            const res = await axiosClient.get(URL);
            return res.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    }
);

export const createCustomer = createAsyncThunk<IResponse, ICustomer>(
    "customer/create",
    async (data) => {
        try {
            const res = await axiosClient.post(URL, data);
            return res.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    }
);

export const editCustomer = createAsyncThunk<IResponse, { id: string, data: ICustomer }>(
    "customer/edit",
    async ({ id, data }) => {
        try {
            const res = await axiosClient.put(URL + "/" + id, data);
            return res.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    }
);