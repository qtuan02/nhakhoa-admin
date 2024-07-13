import { IHistory } from "@/interfaces/IHistory";
import { useAppSelector } from "@/redux/hooks";
import { TableColumnsType } from "antd";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CTag from "@/custom_antd/CTag";
import CSpace from "@/custom_antd/CSpace";
import CButton from "@/custom_antd/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CTable from "@/custom_antd/CTable";

export default function TableComponent() {
    const history = useAppSelector((state) => state.history);
    const columns: TableColumnsType<IHistory> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 70,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            width: 230,
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: "Tên nha sĩ",
            dataIndex: "doctor_name",
            key: "doctor_name",
            width: 230,
            ...getColumnSearchProps('doctor_name'),
        },
        {
            title: "Ngày hẹn",
            dataIndex: "date",
            key: "date",
            width: 150,
            ...getColumnSearchProps('date'),
            sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
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
            width: 100,
            filters: [
                { text: 'Đang chờ', value: 0 },
                { text: 'Hoàn thành', value: 1 },
                { text: 'Xác nhận', value: 2 },
            ],
            onFilter: (value, item) => item.status === value,
            render: (status) => {
                let icon, color, text;
                switch (status) {
                    case 0:
                        icon = <ClockCircleOutlined />
                        color = "processing"
                        text = "Đang chờ"
                        break;
                    case 1:
                        icon = <CheckCircleOutlined  />
                        color = "success"
                        text = "Hoàn thành"
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
                    <CButton tooltip="Chi tiết" link={`/lich-kham/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className='ts-16'></CButton>
                </CSpace>
            )
        }
    ] as TableColumnsType<IHistory>;

    return (
        <CTable
            columns={columns}
            dataSource={history.data?.map((item, index) => ({...item, index: index + 1, key: item.id, customer_name: item.customer?.name, doctor_name: item.doctor?.name }))}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
        />
    );
}