"use client";
import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import { faCalendarPlus, faKey, faPenToSquare, faUserDoctor, faUserNurse, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CTag from "@/custom_antd/CTag";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { IUser } from "@/interfaces/IUser";
import { getUserState, setUserId, toggleModal } from "@/redux/reducers/userReducer";
import ModalComponent from "./ModalComponent";

export default function TableComponent() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUserState);

    const columns: TableColumnsType<IUser> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 80,
        },
        {
            title: "Ảnh",
            dataIndex: "avatar",
            key: "avatar",
            width: 100,
            render: (avatar) => (
                <Image width={40} height={40} src={avatar} alt="img..." />
            )
        },
        {
            title: "Tên nhân viên",
            dataIndex: "name",
            key: "name",
            width: 225,
            ...getColumnSearchProps("name"),
            ellipsis: true
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
            width: 150,
            ...getColumnSearchProps("phone_number"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 225,
            ...getColumnSearchProps("email"),
        },
        {
            title: "Chức vụ",
            dataIndex: "role",
            key: "role",
            width: 150,
            filters: [
                { text: "Nha sĩ", value: 1 },
                { text: "Nhân viên y tế", value: 2 },
                { text: "Quản trị viên", value: 3 },
            ],
            onFilter: (value, item) => item.role === value,
            render: (role) => {
                let icon, text, color;
                switch (role) {
                    case 1:
                        icon = <FontAwesomeIcon icon={faUserDoctor} />
                        color = "processing"
                        text = "Nha sĩ"
                        break;
                    case 2:
                        icon = <FontAwesomeIcon icon={faUserNurse} />
                        color = "warning"
                        text = "Nhân viên y tế"
                        break;
                    case 3:
                        icon = <FontAwesomeIcon icon={faUserShield} />
                        color = "green"
                        text = "Quản trị viên"
                        break;
                }
                return <CTag icon={icon} color={color}><span className="ml-2">{text}</span></CTag>;
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 120,
            filters: [
                { text: "Hoạt động", value: 1 },
                { text: "Vô hiệu hóa", value: 0 },
            ],
            onFilter: (value, item) => item.status === value,
            render: (status) => (<CTag icon={status === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={status === 1 ? "green" : "red"}>{status === 1 ? "Hoạt động" : "Vô hiệu hóa"}</CTag>)
        },
        {
            title: "Thao tác",
            key: "item",
            width: 150,
            render: (item) => (
                <CSpace>
                    <CButton tooltip="Chỉnh sửa thông tin nhân viên y tế" link={`/nguoi-dung/sua/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className="ts-16"></CButton>
                    <CButton tooltip="Đổi mật khẩu" type="primary" danger icon={<FontAwesomeIcon icon={faKey} />} className="ts-16"
                        onClick={() => {
                            dispatch(toggleModal());
                            dispatch(setUserId(String(item.id)));
                        }}
                    ></CButton>
                    {item.role === 1 && item.status === 1 ? <CButton tooltip="Tạo lịch làm việc" link={`/lich-lam-viec/them/${item.id}`} type="default" icon={<FontAwesomeIcon icon={faCalendarPlus} />} className="ts-16"></CButton> : null}
                </CSpace>
            )
        }
    ] as TableColumnsType<IUser>;
    return (

        <>
            <CTable
                columns={columns}
                dataSource={user?.data?.map((item: IUser, index: number) => ({ ...item, index: index + 1, key: item.id, role: item.role?.id })) || []}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "15"] }}
            />
            <ModalComponent />
        </>
    );
}