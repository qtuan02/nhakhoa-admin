"use client";
import { Spin } from "antd";

export default function AppLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
			<Spin size="large"></Spin>
		</div>
    );
}