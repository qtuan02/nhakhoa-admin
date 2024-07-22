import { getServices } from "@/apis/serviceApi";
import CButton from "@/custom_antd/CButton";
import CModal from "@/custom_antd/CModal";
import CSkeleton from "@/custom_antd/CSkeleton";
import { IService } from "@/interfaces/IService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Divider, Image, TableColumnsType } from "antd";
import { useEffect } from "react";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import CTable from "@/custom_antd/CTable";
import CTitle from "@/custom_antd/CTitle";
import { addService, toggleModal } from "@/redux/reducers/appointmentReducer";

export default function ModalComponent() {
    const dispatch = useAppDispatch();
    const service = useAppSelector((state) => state.service);
    const isOpenModal = useAppSelector((state) => state.appointment.modal);

    useEffect(() => {
        if(service.status === "completed" || service.status === "rejected"){
            dispatch(getServices());
        }
    }, [dispatch, service.status]);

    const columns: TableColumnsType<IService> = [
        {
            title: "#",
            dataIndex: "index",
            width: 50,
            key: "index",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            width: 100,
            render: (image) => (
                <Image width={40} height={40} src={image} alt="img..." />
            )
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 250,
            ...getColumnSearchProps('name'),
        },
        {
            title: "Giá/Đơn vị",
            dataIndex: "min_price",
            key: "min_price",
            width: 150,
            sorter: (a: any, b: any) => a.min_price - b.min_price,
            render: (min_price, item) => <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(min_price))+"/"+item.unit}</span>
        },
        {
            title: "Thao tác",
            key: "item",
            width: 100,
            render: (item) => <CButton type="primary" size="small" onClick={() => dispatch(addService(item))}>Chọn</CButton>
        }
    ] as TableColumnsType<IService>;

    return (
        <CModal open={isOpenModal} onCancel={() => dispatch(toggleModal())} footer={null} width={800}>
            <Divider><CTitle level={4}>Chọn dịch vụ</CTitle></Divider>
            <CSkeleton loading={service.loading}>
                <CTable
                    className="table-modal"
                    columns={columns}
                    dataSource={service?.data?.map((item: IService, index: number) => ({ ...item, index: index + 1, key: item.id })) || []}
                    pagination={{ defaultPageSize: 5, showSizeChanger: false }}
                />
            </CSkeleton>
        </CModal>
    );
}