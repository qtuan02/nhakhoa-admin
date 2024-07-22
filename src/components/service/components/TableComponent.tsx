"use client";
import CButton from "@/custom_antd/CButton";
import CPopConfirm from "@/custom_antd/CPopConfirm";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import CTag from "@/custom_antd/CTag";
import { IService } from "@/interfaces/IService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, TableColumnsType } from "antd";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { deleteService } from "@/apis/serviceApi";

export default function TableComponent() {
    const service = useAppSelector((state) => state.service);
    const dispatch = useAppDispatch();
    const columns: TableColumnsType<IService> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 75,
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            width: 200,
            render: (image) => (
                <Image width={40} height={40} src={image}  alt="img..." />
            )
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
            width: 350,
            ...getColumnSearchProps('name'),
        },
        {
            title: "Đã bán",
            dataIndex: "quantity_sold",
            key: "quantity_sold",
            width: 100,
            sorter: (a: any, b: any) => a.quantity_sold - b.quantity_sold,
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            width: 275,
            render: (category) => ( <span>{category.name}</span> )
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 200,
            filters: [
                { text: 'Hoạt động', value: 1 },
                { text: 'Vô hiệu hóa', value: 0 },
            ],
            onFilter: (value, item) => item.status === value,
            render: (status) => ( <CTag icon={ status === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={status === 1 ? "green" : "red"}>{status === 1 ? "Hoạt động" : "Vô hiệu hóa"}</CTag> )
        },
        {
            title: "Thao tác",
            key: "item",
            width: 200,
            render: (item) => (
                <CSpace>
                    <CButton tooltip="Chỉnh sửa dịch vụ" link={`/dich-vu/sua/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className='ts-16'></CButton>
                    <CPopConfirm title={"Thông báo!!!"} description={`Bạn muốn xóa dịch vụ "${item.name}"`} onConfirm={() => dispatch(deleteService(item.id))}>
                        <CButton tooltip="Xóa dịch vụ" type="primary" danger icon={<FontAwesomeIcon icon={faTrashCan} />} className='ts-16'></CButton>
                    </CPopConfirm>
                </CSpace>
            )
        }
    ] as TableColumnsType<IService>;
    return (
        <CTable
            columns={columns}
            dataSource={service?.data?.map((item: IService, index: number) => ({...item, index: index + 1, key: item.id })) || []}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
        />
    );
}