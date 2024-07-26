"use client";
import SiderComponent from "./components/SiderComponent";
import HeaderComponent from "./components/HeaderComponent";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authenticateReducer";
import AppLoading from "./AppLoading";

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAppSelector(getAuthenticateState);

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.assign("/dang-nhap");
        }
    }, [isLoggedIn]);

    return (
        <div className="flex h-screen w-screen bg-[#f5f5f5]">
            {!isLoggedIn ? <AppLoading /> :
                <>
                    <SiderComponent />
                    <div className="w-full">
                        <HeaderComponent />
                        <div>
                            <div className="bg-[#fff] mx-4 my-2 rounded-xl px-6 py-4 h-[calc(100vh-96px)] overflow-auto !items-start">{children}</div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}