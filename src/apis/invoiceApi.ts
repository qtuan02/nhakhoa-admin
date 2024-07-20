import axiosClient from "@/commons/AxiosConfig";
import { IInvoice } from "@/interfaces/IInvoice";
import { IResponse } from "@/interfaces/IResponse";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "/v1/invoice";

export const getInvoice = async (id: string) => {
    try {
        const res = await axiosClient.get(URL+ '/' +id);
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const getInvoices = createAsyncThunk<IResponse>(
    'invoice/get',
    async () => {
        try{
            const res = await axiosClient.get(URL);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const editInvoice = createAsyncThunk<IResponse, { id: string, data: IInvoice }>(
    'invoice/edit',
    async({ id, data }) => {
        try{
            const res = await axiosClient.put(URL+ '/' +id, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);