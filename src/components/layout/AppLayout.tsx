"use client";
import SiderComponent from "./components/SiderComponent";
import HeaderComponent from "./components/HeaderComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AppLoading from "./AppLoading";
import { getAuthState } from "@/redux/reducers/authReducer";
import { getNotification } from "@/redux/reducers/notificationReducer";
import { notificationsThunk } from "@/redux/thunks/notificationThunk";

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
    const auth = useAppSelector(getAuthState);
    const notification = useAppSelector(getNotification);

    const dispatch = useAppDispatch();

    const [ sider, setSider ] = useState<boolean>(true);

    const handleToggleSider = () => {
        setSider(!sider);
    }

    useEffect(() => {
        if (!auth.isLoggedIn) {
            window.location.assign("/dang-nhap");
        }
        if(auth.isLoggedIn && notification.status === "completed"){
            dispatch(notificationsThunk());
        }
    }, [auth.isLoggedIn, dispatch, notification.status]);

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