import { createSlice } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { IProfile } from "@/interfaces/IProfile";
import { RootState } from "../store";
import { login, logoutToken } from "../slices/authenticateSlice";

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
    name: "authenticate",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.logging = true;
                if(action.meta.arg.remember){
                    const user = {
                        account: action.meta.arg.account,
                        password: action.meta.arg.password,
                        remember: action.meta.arg.remember
                    };
                    localStorage.setItem("r_u", JSON.stringify(user));
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                TOAST_SUCCESS(action.payload.message);
                state.currentUser = action.payload.data;
                state.isLoggedIn = true;
                state.logging = false;
            })
            .addCase(login.rejected, (state, action: any) => {
                state.logging = false;
                state.currentUser = null;
                TOAST_ERROR(action.error?.message);
            })
            .addCase(logoutToken.fulfilled, (state, action) => {
                state.currentUser = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutToken.rejected, (state, action: any) => {
                TOAST_ERROR(action.error?.message);
            })
        }
});

export const getAuthenticateState = (state: RootState) => state.authenticate;
export const { setCurrentUser } = authenticateSlice.actions;
export default authenticateSlice.reducer;
