import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { ILogin } from "@/interfaces/ILogin";
import { IResponse } from "@/interfaces/IResponse";
import { profile } from "@/apis";
import { IProfile } from "@/interfaces/IProfile";

interface IAuthState {
    profile: IProfile | null;
    loading?: boolean;
}

const initialState: IAuthState = {
    profile: null,
    loading: false
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
        logining: (state, action: PayloadAction<IResponse>) => {
            localStorage.setItem('access_token', action.payload.data.access_token);
            localStorage.setItem('r_e', action.payload.data.role);
            TOAST_SUCCESS(action.payload.message);
        },
        logout: (state) => {
            localStorage.removeItem('r_e');
            localStorage.removeItem('access_token');
			window.location.assign('/dang-nhap');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.data;
            })
            .addCase(profile.rejected, (state, action: any) => {
                state.profile = null;
            })
        }
});

export const { logout, setRemember, logining } = authSlice.actions;
export default authSlice.reducer;
