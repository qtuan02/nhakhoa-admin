"use client";
import { Spin } from "antd";

export default function LoadingComponent() {
    return (
        <div className="w-full h-full flex items-center justify-center">
			<Spin size="large"></Spin>
		</div>
    );
}