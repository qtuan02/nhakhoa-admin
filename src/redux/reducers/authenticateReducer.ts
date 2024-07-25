import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ILogin } from "@/interfaces/ILogin";
import { IProfile } from "@/interfaces/IProfile";
import { RootState } from "../store";
import { login, profile } from "../slices/authenticateSlice";

const initialUser: IProfile = {
    id: "",
    name: "",
    avatar: "",
    phone_number: "",
    email: "",
    birthday: "",
    gender: 1,
    address: "",
    role: "",
}

interface IAuthenticateState {
    logging: boolean;
    currentUser: IProfile;
    modal: boolean;
    isLoggedIn: boolean;
}

const initialState: IAuthenticateState = {
    logging: false,
    currentUser: initialUser,
    modal: false,
    isLoggedIn: false,
};

const authenticateSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('access_token');
			window.location.assign('/dang-nhap');
        },
        toggleModal: (state) => {
            state.modal =!state.modal;
        },
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
                    localStorage.setItem('r_u', JSON.stringify(user));
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('access_token', action.payload.data.access_token);
                state.logging = false;
                state.isLoggedIn = true;
                window.location.assign('/');
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(login.rejected, (state, action: any) => {
                state.logging = false;
                TOAST_ERROR(action.error?.message);
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.currentUser = action.payload.data;
            })
            .addCase(profile.rejected, (state, action: any) => {
                state.isLoggedIn = true;
                TOAST_ERROR(action.error?.message);
            })
        }
});

export const getAuthenticateState = (state: RootState) => state.authenticate;
export const { logout, toggleModal } = authenticateSlice.actions;
export default authenticateSlice.reducer;
