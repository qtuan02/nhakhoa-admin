"use client";
import LoginComponent from "@/components/login/Index";
import { appConfig } from "@/config/AppConfig";
import { useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authReducer";
import { useEffect } from "react";

export default function LoginPage() {
    const auth = useAppSelector(getAuthenticateState);

    useEffect(() => {
        if (auth.isLoggedIn) {
            if(auth.currentUser?.role === appConfig.R_1){
                window.location.assign("/");
            } else if (auth.currentUser?.role === appConfig.R_2){
                window.location.assign("/khach-hang");
            } else {
                window.location.assign("/lich-kham");
            }
        }
    }, [auth.currentUser?.role, auth.isLoggedIn]);

    return (
        <LoginComponent />
    );
}