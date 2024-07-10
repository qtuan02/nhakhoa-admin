import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppointment, deleteAppointment, editAppointment, getAppointments, getDate, getDoctors, getTimes } from "@/apis";
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "@/utils/FunctionUiHelpers";
import { IAppointment, IDate, ITime } from "@/interfaces/IAppointment";
import { IUser } from "@/interfaces/IUser";
import { getTime } from "@/apis/scheduleApi";
import { IService } from "@/interfaces/IService";

interface IAppointmentState {
    loading?: boolean;
    status?: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: IAppointment[];
    doctors: IUser[];
    loadingDoctors?: boolean;
    times: ITime[];
    loadingTimes?: boolean;
    date: IDate[];
    loadingDate?: boolean;
    time: ITime[];
    loadingTime?: boolean;
    modal?: boolean;
    services: IService[];
};

const initialState: IAppointmentState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: [],
    doctors: [],
    loadingDoctors: false,
    times: [],
    loadingTimes: false,
    date: [],
    loadingDate: false,
    time: [],
    loadingTime: false,
    modal: false,
    services: [],
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setDate: (state) => {
            state.date = [];
        },
        setTime: (state) => {
            state.time = [];
        },
        toggleModal: (state) => {
            state.modal = !state.modal;
        },
        addService: (state, action: PayloadAction<IService>) => {
            const service = action.payload;
            if(state.services.find(s => s.id === service.id)) {
                TOAST_WARNING("Dịch vụ đã được thêm!");
            }else{
                state.services.push(service);
            }
        },
        removeService: (state, action: PayloadAction<number>) => {
            const service_id = action.payload;
            const index = state.services.findIndex(s => s.id === service_id);
            if (index !== -1) {
                state.services.splice(index, 1);
            }
        },
        clearService: (state) => {
            state.services = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAppointments.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getAppointments.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.services = [];
                state.status = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createAppointment.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(deleteAppointment.fulfilled, (state, action: any) => {
                state.data = state.data.filter((item) => item.id !== action.payload.data);
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(deleteAppointment.rejected, (state, action: any) => {
                state.status = 'rejected';
                TOAST_ERROR(action.error?.message);
            })
            .addCase(editAppointment.pending, (state) => {
                state.edit = 'wait';
            })
            .addCase(editAppointment.fulfilled, (state, action) => {
                state.services = [];
                state.status = 'completed';
                state.edit = 'success';
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editAppointment.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.edit = 'fail';
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getDoctors.pending, (state) => {
                state.loadingDoctors = true;
            })
            .addCase(getDoctors.fulfilled, (state, action) => {
                state.loadingDoctors = false;
                state.doctors = action.payload.data;
            })
            .addCase(getDoctors.rejected, (state, action: any) => {
                state.doctors = [];
                state.loadingDoctors = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getTimes.pending, (state) => {
                state.loadingTimes = true;
            })
            .addCase(getTimes.fulfilled, (state, action) => {
                state.loadingTimes = false;
                state.times = action.payload.data;
            })
            .addCase(getTimes.rejected, (state, action: any) => {
                state.times = [];
                state.loadingTimes = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getDate.pending, (state) => {
                state.loadingDate = true;
            })
            .addCase(getDate.fulfilled, (state, action) => {
                state.loadingDate = false;
                state.date = action.payload.data;
            })
            .addCase(getDate.rejected, (state, action: any) => {
                state.date = [];
                state.loadingDate = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getTime.pending, (state) => {
                state.loadingTime = true;
            })
            .addCase(getTime.fulfilled, (state, action) => {
                state.loadingTime = false;
                state.time = action.payload.data;
            })
            .addCase(getTime.rejected, (state, action: any) => {
                state.time = [];
                state.loadingTime = false;
                TOAST_ERROR(action.error?.message)
            })
    }
});

export const { setDate, setTime, toggleModal, addService, removeService, clearService } = appointmentSlice.actions;
export default appointmentSlice.reducer;