"use client";
import SiderComponent from "./components/SiderComponent";
import HeaderComponent from "./components/HeaderComponent";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import AppLoading from "./AppLoading";
import { getAuthenticateState } from "@/redux/reducers/authReducer";

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
    const auth = useAppSelector(getAuthenticateState);

    const [ sider, setSider ] = useState<boolean>(false);

    const handleToggleSider = () => {
        setSider(!sider);
    }

    useEffect(() => {
        if (!auth.isLoggedIn) {
            window.location.assign("/dang-nhap");
        }
    }, [auth.isLoggedIn]);

    return (
        <div className="flex h-screen w-screen bg-[#f5f5f5]">
            {!auth.isLoggedIn ? <AppLoading /> :
                <>
                    <SiderComponent sider={sider} />
                    <div className="w-full">
                        <HeaderComponent sider={sider} toggle={handleToggleSider} />
                        <div>
                            <div className="bg-[#fff] mx-4 my-2 rounded-xl px-6 py-4 h-[calc(100vh-96px)] overflow-auto !items-start">{children}</div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}