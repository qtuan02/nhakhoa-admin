import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "@/utils/FunctionUiHelpers";
import { IAppointment } from "@/interfaces/IAppointment";
import { IService } from "@/interfaces/IService";
import { RootState } from "../store";
import { appointmentCreateThunk, appointmentDeleteThunk, appointmentEditThunk, appointmentsThunk } from "../thunks/appointmentThunk";

interface IAppointmentState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: IAppointment[];
    services?: IService[];
};

const initialState: IAppointmentState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
    services: [],
};

const appointmentSlice = createSlice({
    name: "appointment",
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
            if (index) {
                state.services?.splice(index, 1);
            }
        },
        clearService: (state) => {
            state.services = [];
        },
        setServices: (state, action: PayloadAction<IService[]>) => {
            state.services = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(appointmentsThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(appointmentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(appointmentsThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(appointmentCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(appointmentCreateThunk.fulfilled, (state, action) => {
                state.services = [];
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(appointmentCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(appointmentDeleteThunk.fulfilled, (state, action) => {
                state.data = state.data?.filter((item) => item.id !== action.payload.data.id);
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(appointmentDeleteThunk.rejected, (state, action) => {
                state.status = "rejected";
                TOAST_ERROR(action?.payload);
            })
            .addCase(appointmentEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(appointmentEditThunk.fulfilled, (state, action) => {
                state.services = [];
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(appointmentEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getAppointmentState = (state: RootState) => state.appointment;
export const { addService, removeService, clearService, setServices } = appointmentSlice.actions;
export default appointmentSlice.reducer;