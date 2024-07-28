"use client";
import LoginComponent from "@/components/login/Index";
import { appConfig } from "@/config/AppConfig";
import { useAppSelector } from "@/redux/hooks";
import { getAuthState } from "@/redux/reducers/authReducer";
import { useEffect } from "react";

export default function LoginPage() {
    const auth = useAppSelector(getAuthState);

    // useEffect(() => {
    //     if (auth?.isLoggedIn) {
    //         window.location.assign("/");
    //     }
    // }, [auth?.isLoggedIn])

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