import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumnsType } from "antd";
import { useAppSelector } from "@/redux/hooks";
import CTag from "@/custom_antd/CTag";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { IInvoice } from "@/interfaces/IInvoice";
import { customNumberPrice } from "@/utils/FunctionHelpers";
import { getInvoiceState } from "@/redux/reducers/invoiceReducer";

export default function TableComponent() {
    const invoice = useAppSelector(getInvoiceState);

    const columns: TableColumnsType<IInvoice> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Mã khách hàng",
            dataIndex: "customer_id",
            key: "customer_id",
            ...getColumnSearchProps('customer_id'),
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: "Tổng giá",
            dataIndex: "total_price",
            key: "total_price",
            sorter: (a: any, b: any) => a.total_price - b.total_price,
            render: (total_price) => customNumberPrice(total_price)
        },
        {
            title: "Phương thức",
            dataIndex: "method_payment",
            key: "method_payment",
            filters: [
                { text: 'Tiền mặt', value: 0 },
                { text: 'Chuyển khoản', value: 1 },
            ],
            onFilter: (value, item) => item.method_payment === value,
            render: (method_payment) => method_payment === 0 ? <p>Tiền mặt</p> : <p>Chuyển khoản</p>
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
                    <CButton tooltip="Cập nhật hóa đơn" link={`/hoa-don/sua/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className='ts-16'></CButton>
                </CSpace>
            )
        }
    ] as TableColumnsType<IInvoice>;
    return (
        <CTable
            columns={columns}
            dataSource={invoice?.data?.map((item: IInvoice, index: number) => ({...item, index: index + 1, key: item.id, customer_name: item?.customer?.name, customer_id: item?.customer?.id })) || []}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
        />
    );
}