import axiosClient from "@/config/AxiosConfig";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { ICategory } from "@/interfaces/ICategory";
import { IResponse } from "@/interfaces/IResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "/v1/category";

export const getCategory = async (id: string) => {
    try {
        const res = await axiosClient.get(URL+ "/" +id);
        return res.data.data;
    }catch(error: any) {
        TOAST_ERROR(error?.response?.data?.message);
        return null;
    }
};

export const getCategories = createAsyncThunk<IResponse>(
    "category/get",
    async () => {
        try{
            const res = await axiosClient.get(URL);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const createCategory = createAsyncThunk<IResponse, ICategory>(
    "category/create",
    async (data) => {
        try{
            const res = await axiosClient.post(URL, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const deleteCategory = createAsyncThunk<IResponse, number>(
    "category/delete",
    async (id) => {
        try{
            const res = await axiosClient.delete(URL+ "/" +id);
            return {...res.data, data: id};
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);

export const editCategory = createAsyncThunk<IResponse, { id: string, data: ICategory }>(
    "category/edit",
    async({ id, data }) => {
        try{
            const res = await axiosClient.put(URL+ "/" +id, data);
            return res.data;
        }catch(error: any) {
            throw error?.response?.data;
        }
    }
);