import { getHistory } from "@/redux/slices/historySlice";
import CCol from "@/custom_antd/CCol";
import CDescriptionItem from "@/custom_antd/CDescriptionItem";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTable from "@/custom_antd/CTable";
import { IHistory, IHistoryDetail } from "@/interfaces/IHistory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCustomerState, toggleDrawer } from "@/redux/reducers/customerReducer";
import { Divider, Drawer, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { formatDate } from "@/utils/FunctionHelpers";
import { getHistoryState } from "@/redux/reducers/historyReducer";

export default function DrawerComponent() {
    const dispatch = useAppDispatch();
    const history = useAppSelector(getHistoryState);
    const customer = useAppSelector(getCustomerState);

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IHistory | null>();
    

    const getDataHistory = async (id: string) => {
        setLoading(true);
        const history = await getHistory(id);
        setLoading(false);
        return history ? setData(history) : setData(null);
    }

    useEffect(() => {
        getDataHistory(customer.history_id as string);
    }, [customer.history_id]);

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
            ...getColumnSearchProps('name'),
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
            render: (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
        },
        {
            title: "Tổng",
            dataIndex: "total",
            key: "total",
            sorter: (a: any, b: any) => a.total - b.total,
            render: (total: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)
        }
    ] as TableColumnsType<IHistoryDetail>;

    return <Drawer placement="right" width={680} open={customer.drawer} onClose={() => dispatch(toggleDrawer())} footer={null} title={"CHI TIẾT KHÁM - MÃ "+history.history_id}>
        <CSkeleton loading={loading}>
            <Divider>Thông tin</Divider>
            <CRow>
                <CCol span={12}>
                    <CDescriptionItem title="Họ tên" content={data?.customer?.name} />
                </CCol>
                <CCol span={12}>
                    <CDescriptionItem title="Ngày khám" content={formatDate(data?.date)} />
                </CCol>
            </CRow>
            <CRow>
                <CCol span={12}>
                    <CDescriptionItem title="Nha sĩ" content={data?.doctor?.name} />
                </CCol>
                <CCol span={12}>
                    <CDescriptionItem title="Thời gian" content={data?.time} />
                </CCol>
            </CRow>
            <CDescriptionItem title="Tổng giá" content={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(data?.total_price))} />
            <CDescriptionItem title="Ghi chú" content={data?.note} />
            <Divider>Dịch vụ</Divider>
            <CTable
                columns={columns}
                dataSource={data?.services?.map((item, index) => ({ ...item, index: index + 1, key: item.id, total: item.price && item.quantity ? item.quantity * item.price : undefined }))}
                pagination={false}
            />
        </CSkeleton>
    </Drawer>
}