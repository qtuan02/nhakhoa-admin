"use client";
import CMenu from "@/custom_antd/CMenu";
import CSider from "@/custom_antd/CSider";
import { usePathname } from "next/navigation";
import useSider from "@/hooks/useSider";

interface ISiderComponentProps {
    sider: boolean
}

export default function SiderComponent({ sider }: ISiderComponentProps) {
    const pathname = usePathname();

    const menu = useSider();

    return (
        <CSider style={{ overflowY: 'auto', height: '100vh', left: 0, top: 0, bottom: 0, background: 'white' }} width="256px"
            collapsible collapsed={sider} trigger={null}>
            <CMenu
                className="!h-full pt-5"
                mode="inline"
                selectedKeys={[pathname]}
                items={menu}
            />
        </CSider>
    );
}