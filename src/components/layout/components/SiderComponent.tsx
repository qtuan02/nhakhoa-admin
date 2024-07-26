import { SIDER_MENU } from "@/utils/Option";
import CMenu from "@/custom_antd/CMenu";
import CSider from "@/custom_antd/CSider";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { getSiderState } from "@/redux/reducers/siderReducer";

export default function SiderComponent() {
    const pathname = usePathname();
    const { sider } = useAppSelector(getSiderState);

    return (
        <CSider style={{ overflowY: 'auto', height: '100vh', left: 0, top: 0, bottom: 0, background: 'white' }} width="256px"
            collapsible collapsed={sider} trigger={null}>
            <CMenu
                className="!h-full pt-5"
                mode="inline"
                selectedKeys={[pathname]}
                items={SIDER_MENU}
            />
        </CSider>
    );
}