"use client";
import CButton from "@/custom_antd/CButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getNotification } from "@/redux/reducers/notificationReducer";
import { notificationEditThunk } from "@/redux/thunks/notificationThunk";
import { Drawer, List } from "antd";
import { useRouter } from "next/navigation";

interface IDrawerComponentProps {
    drawer: boolean,
    toggle: () => void
}

export default function DrawerComponent({ drawer, toggle }: IDrawerComponentProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const notifiaction = useAppSelector(getNotification);

    return (
        <Drawer title="THÔNG BÁO" onClose={toggle} open={drawer}>
            <List
                itemLayout="horizontal"
                dataSource={notifiaction.data}
                renderItem={(item, index) => (
                    <List.Item className={item.status === 1 ? "!px-4 !py-2 rounded-lg !mb-1 r cursor-pointer hover:opacity-70 !bg-[rgba(224,255,255)]" :  "!px-4 !py-2 rounded-lg !mb-1 r cursor-pointer hover:opacity-70 !bg-[#fff]"} onClick={()=> {
                        toggle();
                        dispatch(notificationEditThunk(item.id || ""));
                        router.push(item.url || "#");
                    }}>
                        <List.Item.Meta
                            title={<p className="font-[600]">{item.title}</p>}
                            description={<p>{item.message}</p>}
                        />
                    </List.Item>
                )}
            />
        </Drawer>
    );
}