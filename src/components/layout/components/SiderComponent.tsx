import { SIDER_MENU } from "@/commons/Option";
import CMenu from "@/custom_antd/CMenu";
import CSider from "@/custom_antd/CSider";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";

export default function SiderComponent() {
    const pathname = usePathname();
    const isSiderOpen = useAppSelector((state) => state.sider.isSiderOpen);

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