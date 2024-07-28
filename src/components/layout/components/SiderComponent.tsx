"use client";
import { SIDER_MENU, SIDER_MENU_DOCTOR, SIDER_MENU_EMPLOYEE } from "@/utils/Option";
import CMenu from "@/custom_antd/CMenu";
import CSider from "@/custom_antd/CSider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authReducer";
import { appConfig } from "@/config/AppConfig";

interface ISiderComponentProps {
    sider: boolean
}

export default function SiderComponent({ sider }: ISiderComponentProps) {
    const pathname = usePathname();

    const [ menu, setMenu ] = useState(SIDER_MENU);
    
    const auth = useAppSelector(getAuthenticateState);

    useEffect(() => {
        if(auth.currentUser?.role === appConfig.R_2){
            setMenu(SIDER_MENU_EMPLOYEE);
        }
        
        if(auth.currentUser?.role === appConfig.R_3){
            setMenu(SIDER_MENU_DOCTOR);
        }
    }, [auth.currentUser?.role])

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