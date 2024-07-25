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
        },
        isLogging: (state) => {
            state.logging = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.logging = true;
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
                TOAST_ERROR(action.error?.message);
            })
        }
});

export const getAuthenticateState = (state: RootState) => state.authenticate;
export const { logout, setRemember, toggleModal } = authenticateSlice.actions;
export default authenticateSlice.reducer;
