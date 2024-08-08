import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "@/utils/FunctionUiHelpers";
import { IHistory } from "@/interfaces/IHistory";
import { IService } from "@/interfaces/IService";
import { RootState } from "../store";
import { historiesThunk, historyCreateThunk, historyEditThunk } from "../thunks/historyThunk";
import { IAppointment } from "@/interfaces/IAppointment";

interface IHistoryState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: IHistory[];
    services?: IService[];
    appointment?: IAppointment | null;
};

const initialState: IHistoryState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
    services: [],
    appointment: null,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addService: (state, action) => {
            const service = action.payload;
            if(state.services?.find(s => s.id === service.id)) {
                TOAST_WARNING("Dịch vụ đã được thêm!");
            }else{
                state.services?.push(service);
            }
        },
        removeService: (state, action) => {
            const service_id = action.payload;
            const index = state.services?.findIndex(s => s.id === service_id);
            if (index !== undefined) {
                state.services?.splice(index, 1);
                TOAST_SUCCESS("Xóa thành công!");
            }
        },
        editService: (state, action) => {
            const service = action.payload;
            const index = state.services?.findIndex(s => s.id === service.id);
            if (index !== undefined && state.services) {
                state.services[index].price = service.price;
                state.services[index].quantity = service.quantity;
            }
        },
        clearService: (state) => {
            state.services = [];
        },
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setAppointment: (state, action) => {
            state.appointment = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(historiesThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(historiesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(historiesThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(historyCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(historyCreateThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(historyCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(historyEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(historyEditThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(historyEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getHistoryState = (state: RootState) => state.history;
export const { addService, removeService, editService, clearService, setServices, setAppointment } = historySlice.actions;
export default historySlice.reducer;