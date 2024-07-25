"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authenticateReducer";
import { getSiderState } from "@/redux/reducers/siderReducer";
import { profile } from "@/redux/slices/authenticateSlice";
import { useEffect } from "react";
import LoadingComponent from "./Loading";
import SiderComponent from "./components/SiderComponent";
import HeaderComponent from "./components/HeaderComponent";
import { Spin } from "antd";

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector(getAuthenticateState);

    useEffect(() => {
        dispatch(profile());
    }, [dispatch])

    return (
        !isLoggedIn ?
            <div className='w-screen h-screen flex items-center justify-center z-10'>
                <Spin size='large'></Spin>
            </div> :
            <div className="flex h-screen w-screen bg-[#f5f5f5]">
                <SiderComponent />
                <div className="w-full">
                    <HeaderComponent />
                    <div>
                        <div className="bg-[#fff] mx-4 my-2 rounded-xl px-6 py-4 h-[calc(100vh-96px)] overflow-auto !items-start">{children}</div>
                    </div>
                </div>
            </div>
    );
}