"use client";
import HeaderComponent from "@/components/layout/components/HeaderComponent";
import SiderComponent from "./components/SiderComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import LoadingComponent from "./Loading";
import { getAuthState } from "@/redux/reducers/authReducer";
import { profile } from "@/redux/slices/authSlice";

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(getAuthState);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch])

  return (
    <div className="flex h-screen w-screen bg-[#f5f5f5]">
      {auth.loading ? <LoadingComponent />
        : <>
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