import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import { faMagnifyingGlass, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CTag from "@/custom_antd/CTag";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { IInvoice } from "@/interfaces/IInvoice";

export default function TableComponent() {
    const invoice = useAppSelector((state) => state.invoice);
    const dispatch = useAppDispatch();
    const columns: TableColumnsType<IInvoice> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            ...getColumnSearchProps('name'),
        },
        {
            title: "Tổng giá",
            dataIndex: "total_price",
            key: "total_price",
        },
        {
            title: "Phương thức",
            dataIndex: "method_payment",
            key: "method_payment",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            filters: [
                { text: 'Đã thanh toán', value: 1 },
                { text: 'Chưa thanh toán', value: 0 },
            ],
            onFilter: (value, item) => item.status === value,
            render: (status) => ( <CTag icon={ status === 1 ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />} color={status === 1 ? "green" : "error"}>{status === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</CTag> )
        },
        {
            title: "Thao tác",
            key: "item",
            render: (item) => (
                <CSpace>
                    <CButton tooltip="Chỉnh sửa hóa đơn" link={`/hoa-don/sua/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className='ts-16'></CButton>
                    <CButton tooltip="Chi tiết lịch sử" danger link={`/lich-kham/${item?.history_id}`} type="primary" icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} className='ts-16'></CButton>
                </CSpace>   
            )
        }
    ] as TableColumnsType<IInvoice>;
    return (
        <CTable
            columns={columns}
            dataSource={invoice.data?.map((item, index) => ({...item, index: index + 1, key: item.id, customer_name: item?.customer?.name }))}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
        />
    );
}