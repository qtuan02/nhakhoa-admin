import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { IProfile } from "@/interfaces/IProfile";
import { RootState } from "../store";
import { loginThunk, logoutThunk } from "../thunks/authThunk";

interface IAuthenticateState {
    logging: boolean;
    currentUser: IProfile | null;
    isLoggedIn: boolean;
}

const initialState: IAuthenticateState = {
    logging: false,
    currentUser: null,
    isLoggedIn: false,
};

const authenticateSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.logging = true;
                if(action?.meta?.arg?.remember){
                    const user = {
                        account: action.meta.arg.account,
                        password: action.meta.arg.password,
                        remember: action.meta.arg.remember
                    };
                    localStorage.setItem("r_u", JSON.stringify(user));
                }
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                TOAST_SUCCESS(action.payload.message);
                state.currentUser = action.payload.data;
                state.isLoggedIn = true;
                state.logging = false;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.logging = false;
                state.currentUser = null;
                TOAST_ERROR(action?.payload);
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.currentUser = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                TOAST_ERROR(action?.payload);
            })
        }
});

export const getAuthenticateState = (state: RootState) => state.authenticate;
export const { setCurrentUser } = authenticateSlice.actions;
export default authenticateSlice.reducer;
