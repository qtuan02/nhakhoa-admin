import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumnsType } from "antd";
import CPopConfirm from "@/custom_antd/CPopConfirm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteAppointment } from "@/redux/slices/appointmentSlice";
import CTag from "@/custom_antd/CTag";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { IAppointment } from "@/interfaces/IAppointment";
import { formatDate } from "@/utils/FunctionHelpers";
import { getAppointmentState } from "@/redux/reducers/appointmentReducer";

export default function TableComponent() {
    const dispatch = useAppDispatch();
    const appoinment = useAppSelector(getAppointmentState);

    const columns: TableColumnsType<IAppointment> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 70,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            width: 230,
            ...getColumnSearchProps('name'),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: 150,
            ...getColumnSearchProps('phone'),
        },
        {
            title: "Ngày hẹn",
            dataIndex: "date",
            key: "date",
            width: 150,
            ...getColumnSearchProps('date'),
            sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (date) => <p>{formatDate(date)}</p>
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: 120,
            ...getColumnSearchProps('time'),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 120,
            filters: [
                { text: 'Đang chờ', value: 0 },
                { text: 'Xác nhận', value: 1 },
                { text: 'Hủy', value: 2 },
            ],
            onFilter: (value, item) => item.status === value,
            render: (status) => {
                let icon, color, text;
                switch (status) {
                    case 0:
                        icon = <ClockCircleOutlined />
                        color = "warning"
                        text = "Đang chờ"
                        break;
                    case 1:
                        icon = <CheckCircleOutlined />
                        color = "success"
                        text = "Xác nhận"
                        break;
                    case 2:
                        icon = <CloseCircleOutlined />
                        color="error"
                        text = "Hủy"
                        break;
                }
                return <CTag icon={icon} color={color}><span className="ml-2">{text}</span></CTag>;
            }
        },
        {
            title: "Thao tác",
            key: "item",
            width: 120,
            render: (item) => (
                <CSpace>
                    <CButton tooltip="Chỉnh sửa lịch hẹn" link={`/lich-hen/sua/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className='ts-16'></CButton>
                    <CPopConfirm title={"Thông báo!!!"} description={`Bạn muốn xóa lịch hẹn của "${item.name}"`} onConfirm={() => dispatch(deleteAppointment(item.id))}>
                        <CButton tooltip="Xóa danh mục" type="primary" danger icon={<FontAwesomeIcon icon={faTrashCan} />} className='ts-16'></CButton>
                    </CPopConfirm>
                </CSpace>
            )
        }
    ] as TableColumnsType<IAppointment>;
    return (
        <CTable
            columns={columns}
            dataSource={appoinment?.data?.map((item: IAppointment, index: number) => ({...item, index: index + 1, key: item.id })) || []}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
        />
    );
}