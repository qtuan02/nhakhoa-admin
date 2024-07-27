"use client";
import LoginComponent from "@/components/login/Index";
import { useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authReducer";
import { useEffect } from "react";

export default function LoginPage() {
    const auth = useAppSelector(getAuthenticateState);

    useEffect(() => {
        if (auth.isLoggedIn) {
            window.location.assign("/");
        }
    }, [auth.isLoggedIn]);

    return (
        <LoginComponent />
    );
}