import CCol from "@/custom_antd/CCol";
import CDescriptionItem from "@/custom_antd/CDescriptionItem";
import CRow from "@/custom_antd/CRow";
import CTable from "@/custom_antd/CTable";
import { IHistoryDetail } from "@/interfaces/IHistory";
import { IInvoice } from "@/interfaces/IInvoice";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { Divider, TableColumnsType } from "antd";

interface DetailComponentProps {
    data?: IInvoice;
}

export default function DetailComponent({ data }: DetailComponentProps) {
    const columns: TableColumnsType<IHistoryDetail> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            sorter: (a: any, b: any) => a.quantity - b.quantity,
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            sorter: (a: any, b: any) => a.price - b.price,
            render: (price: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
        },
        {
            title: "Tổng",
            dataIndex: "total",
            key: "total",
            sorter: (a: any, b: any) => a.total - b.total,
            render: (total: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)
        }
    ] as TableColumnsType<IHistoryDetail>;
    
    return (
        <>
            <Divider>Hóa đơn - Mã {data?.id} </Divider>
            <CRow>
                <CCol span={12}>
                    <CDescriptionItem title="Mã khách hàng" content={data?.customer?.id} />
                </CCol>
                <CCol span={12}>
                    <CDescriptionItem title="Mã bệnh án" content={String(data?.history?.id)} />
                </CCol>
            </CRow>
            <CRow>
                <CCol span={12}>
                    <CDescriptionItem title="Họ tên khách hàng" content={data?.customer?.name} />
                </CCol>
                <CCol span={12}>
                    <CDescriptionItem title="Ngày khám" content={String(data?.history?.date)} />
                </CCol>
            </CRow>
            <CRow>
                <CCol span={12}>
                    <CDescriptionItem title="Tổng giá" content={data?.customer?.phone_number} />
                </CCol>
                <CCol span={12}>
                    <CDescriptionItem title="Thời gian" content={data?.history?.time} />
                </CCol>
            </CRow>
            <CRow>
                <CCol span={12}>
                    <CDescriptionItem title="Tổng giá" content={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(data?.total_price))} />
                </CCol>
                <CCol span={12}>
                    <CDescriptionItem title="Phương thức thanh toán" content={data?.method_payment === 0 ? "Tiền mặt" : "Chuyển khoản"} />
                </CCol>
            </CRow>
            <CDescriptionItem title="Trạng thái" content={data?.status === 0 ? "Chưa thanh toán" : "Đã thanh toán"} />
            <CDescriptionItem title="Dịch vụ" />
            <CTable
                columns={columns}
                dataSource={data?.history?.services?.map((item, index) => ({ ...item, index: index + 1, key: item.id, total: item.price && item.quantity ? item.quantity * item.price : undefined }))}
                pagination={false}
            />
        </>
    );
}