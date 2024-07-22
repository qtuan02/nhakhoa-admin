import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { IUser } from "@/interfaces/IUser";
import { createUser, editUser, getDoctors, getUsers } from "@/apis";

interface IUserState {
    loading: boolean;
    status: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: IUser[];
    modal: boolean;
    user_id?: string;
    loadingDoctors: boolean;
    statusDoctors: 'pending' | 'completed' | 'rejected';
    doctors: IUser[];
};

const initialState: IUserState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: [],
    modal: false,
    user_id: '',
    loadingDoctors: false,
    statusDoctors: 'completed',
    doctors: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.modal = !state.modal;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.user_id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getUsers.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'completed';
                state.statusDoctors = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createUser.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(editUser.pending, (state) => {
                state.edit = 'wait';
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'completed';
                state.statusDoctors = 'completed';
                state.edit = 'success';
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editUser.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.edit = 'fail';
                TOAST_ERROR(action.error?.message)
            })
            .addCase(getDoctors.pending, (state) => {
                state.statusDoctors = 'pending';
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
    }
});

export const { toggleModal, setUserId } = userSlice.actions;
export default userSlice.reducer;