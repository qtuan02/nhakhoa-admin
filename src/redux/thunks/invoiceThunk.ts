import { invoiceApi } from "@/api/invoiceApi";
import { IInvoice } from "@/interfaces/IInvoice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const invoicesThunk = createAsyncThunk(
    "invoice/getAll",
    async(_, { rejectWithValue }) => {
        try{
            const res = await invoiceApi.get();
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

const invoiceEditThunk = createAsyncThunk(
    "invoice/edit",
    async (data: { id: string, body: IInvoice }, { rejectWithValue }) => {
        try{
            const res = await invoiceApi.edit(data.id, data.body);
            return res.data;
        }catch(error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export { invoicesThunk, invoiceEditThunk };