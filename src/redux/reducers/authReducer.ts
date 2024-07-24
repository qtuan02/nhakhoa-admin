import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ILogin } from "@/interfaces/ILogin";
import { IProfile } from "@/interfaces/IProfile";
import { RootState } from "../store";
import { login, profile } from "../slices/authSlice";

interface IAuthState {
    loging: boolean;
    profile?: IProfile | null;
    loading: boolean;
    modal: boolean;
}

const initialState: IAuthState = {
    loging: false,
    profile: null,
    loading: false,
    modal: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setRemember: (state, action: PayloadAction<ILogin>) => {
            if(action.payload.remember){
                const user = {
                    account: action.payload.account,
                    password: action.payload.password,
                    remember: action.payload.remember
                };
                localStorage.setItem('r_u', JSON.stringify(user));
            }
        },
        logout: (state) => {
            localStorage.removeItem('access_token');
			window.location.assign('/dang-nhap');
        },
        toggleModal: (state) => {
            state.modal =!state.modal;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loging = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('access_token', action.payload.data.access_token);
                state.loging = false;
                window.location.assign('/');
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(login.rejected, (state, action: any) => {
                state.loging = false;
                TOAST_ERROR(action.error?.message);
            })
            .addCase(profile.pending, (state) => {
                state.loading = true;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.data;
            })
            .addCase(profile.rejected, (state, action: any) => {
                state.profile = null;
                TOAST_ERROR(action.error?.message);
            })
        }
});

export const getAuthState = (state: RootState) => state.auth;
export const { logout, setRemember, toggleModal } = authSlice.actions;
export default authSlice.reducer;
