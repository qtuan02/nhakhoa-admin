import { appConfig } from "@/commons/AppConfig";
import { SIDER_MENU, SIDER_MENU_DOCTOR, SIDER_MENU_EMPLOYEE } from "@/commons/Option";
import CMenu from "@/custom_antd/CMenu";
import CSider from "@/custom_antd/CSider";
import { useAppSelector } from "@/redux/hooks";
import { compareRole } from "@/utils/Authentication";
import bcrypt from 'bcryptjs';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiderComponent() {
    const pathname = usePathname();
    const isSiderOpen = useAppSelector((state) => state.sider.isSiderOpen);

    // const [siderMenu, setSiderMenu] = useState<any[]>([]);

    // const handleSiderMenu = async () =>{
    //     const r_e = localStorage.getItem('r_e') || '';
        
        
    //     if(r_e){
    //         const r_1 = await compareRole(appConfig.R_1, r_e);
    //         const r_2 = await compareRole(appConfig.R_2, r_e);
    //         const r_3 = await compareRole(appConfig.R_3, r_e);
    //         if(r_1 || r_2 || r_3){
    //             setSiderMenu(r_1 ? SIDER_MENU : ( r_2 ? SIDER_MENU_EMPLOYEE : SIDER_MENU_DOCTOR ));
    //         }else{
    //             setSiderMenu([]);
    //         }
    //     }
    // }

    // useEffect(() => {
    //     handleSiderMenu();
    // }, []);

    return (
        <CSider style={{ overflowY: 'auto', height: '100vh', left: 0, top: 0, bottom: 0, background: 'white' }} width="256px"
            collapsible collapsed={isSiderOpen} trigger={null}>
            <CMenu
                className="!h-full"
                mode="inline"
                selectedKeys={[pathname]}
                items={SIDER_MENU}
            />
        </CSider>
    );
}