"use client";
import HeaderComponent from "@/components/layout/components/HeaderComponent";
import SiderComponent from "./components/SiderComponent";

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full bg-[#f5f5f5]">
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