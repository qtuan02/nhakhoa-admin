import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { IUser } from "@/interfaces/IUser";
import { RootState } from "../store";
import { userCreateThunk, userEditThunk, usersThunk } from "../thunks/userThunk";

interface IUserState {
    loading: boolean;
    status: "pending" | "completed" | "rejected";
    edit: "wait" | "success" | "fail";
    data?: IUser[];
};

const initialState: IUserState = {
    loading: false,
    status: "completed",
    edit: "success",
    data: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersThunk.pending, (state) => {
                state.status = "pending";
                state.loading = true;
            })
            .addCase(usersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(usersThunk.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(userCreateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(userCreateThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(userCreateThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.loading = false;
                TOAST_ERROR(action?.payload)
            })
            .addCase(userEditThunk.pending, (state) => {
                state.edit = "wait";
            })
            .addCase(userEditThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.edit = "success";
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(userEditThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.edit = "fail";
                TOAST_ERROR(action?.payload)
            })
    }
});

export const getUserState = (state: RootState) => state.user;
export default userSlice.reducer;