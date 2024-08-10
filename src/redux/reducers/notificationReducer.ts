import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { RootState } from "../store";
import { INotification } from "@/interfaces/INotification";
import { notificationEditThunk, notificationsThunk } from "../thunks/notificationThunk";

interface INotificationState {
    count: number;
    status: "pending" | "completed";
    data?: INotification[];
};

const initialState: INotificationState = {
    count: 0,
    status: "completed",
    data: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.count = action.payload;
        },
        countNotification: (state) => {
            state.count = state.count + 1;
        },
        addNotification: (state, action) => {
            TOAST_SUCCESS(action.payload.message || "Có lịch hẹn mới!");
            state.data?.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(notificationsThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(notificationsThunk.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.count = action.payload.data.filter((item: INotification) => item.status === 1).length;
            })
            .addCase(notificationsThunk.rejected, (state, action) => {
                state.data = [];
                TOAST_ERROR(action?.payload)
            })
            .addCase(notificationEditThunk.pending, (state, action) => {
                const item = state.data?.find(item => item.id === action.meta.arg);
                if (item) {
                    item.status = 0;
                }
            })
    }
});

export const getNotification = (state: RootState) => state.notification;
export const { setNotification, countNotification, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;