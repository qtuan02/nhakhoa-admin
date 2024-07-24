import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import { ICategory } from "@/interfaces/ICategory";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, TableColumnsType } from "antd";
import CPopConfirm from "@/custom_antd/CPopConfirm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCategory } from "@/redux/slices/categorySlice";
import CTag from "@/custom_antd/CTag";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { getCategoryState } from "@/redux/reducers/categoryReducer";

export default function TableComponent() {
    const dispatch = useAppDispatch();
    const category = useAppSelector(getCategoryState);

    const columns: TableColumnsType<ICategory> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 100,
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            width: 250,
            render: (image) => (
                <Image width={65} height={40} src={image}  alt="img..." />
            )
        },
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            width: 450,
            ...getColumnSearchProps('name'),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 300,
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
            width: 300,
            render: (item) => (
                <CSpace>
                    <CButton tooltip="Chỉnh sửa danh mục" link={`/danh-muc/sua/${item.id}`} type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className='ts-16'></CButton>
                    <CPopConfirm title={"Thông báo!!!"} description={`Bạn muốn xóa danh mục "${item.name}"`} onConfirm={() => dispatch(deleteCategory(item.id))}>
                        <CButton tooltip="Xóa danh mục" type="primary" danger icon={<FontAwesomeIcon icon={faTrashCan} />} className='ts-16'></CButton>
                    </CPopConfirm>
                </CSpace>
            )
        }
    ] as TableColumnsType<ICategory>;
    return (
        <CTable
            columns={columns}
            dataSource={category?.data?.map((item: ICategory, index: number) => ({...item, index: index + 1, key: item.id })) || []}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
        />
    );
}