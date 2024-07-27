import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import CTable from "@/custom_antd/CTable";
import { faCirclePlus, faInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, CheckboxOptionType, TableColumnsType } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { getColumnSearchProps } from "@/utils/FunctionUiHelpers";
import { ICustomer } from "@/interfaces/ICustomer";
import { useState } from "react";
import CTitle from "@/custom_antd/CTitle";
import { getCustomerState } from "@/redux/reducers/customerReducer";
import { IHistory } from "@/interfaces/IHistory";
import DrawerComponent from "./DrawerComponent";
import { formatDate } from "@/utils/FunctionHelpers";

export default function TableComponent() {
    const customer = useAppSelector(getCustomerState);

    const [ historyId, setHistoryId ] = useState<string>('');
    const [ drawer, setDrawer ] = useState<boolean>(false);

    const handleToggleDrawer = () => {
        setDrawer(!drawer);
    }
    
    const columns: TableColumnsType<ICustomer> = [
        {
            title: "Mã",
            dataIndex: "id",
            key: "id",
            width: 100,
            sorter: (a: any, b: any) => a.id.localeCompare(b.id),
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            width: 180,
            ...getColumnSearchProps("name"),
            ellipsis: true,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
            width: 140,
            ...getColumnSearchProps("phone_number"),
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            width: 110,
            render: (birthday) => <p>{formatDate(birthday)}</p>
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
            ...getColumnSearchProps("email"),
            ellipsis: true,
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            width: 120,
            filters: [
                { text: "Nam", value: 1 },
                { text: "Nữ", value: 0 },
            ],
            onFilter: (value, item) => item.gender === value,
            render: (gender) => (<span>{gender === 1 ? "Nam" : "Nữ"}</span>)
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: 220,
            ellipsis: true,
        },
        {
            title: "Thao tác",
            key: "item",
            width: 100,
            render: (item) => (
                <CSpace>
                    <CButton link={`/khach-hang/sua/${item.id}`} tooltip="Chỉnh sửa thông tin khách hàng" type="primary" icon={<FontAwesomeIcon icon={faPenToSquare} />} className="ts-16"></CButton>
                    <CButton link={`/lich-kham/them/${item.id}`} tooltip="Tạo lịch khám" type="primary" danger icon={<FontAwesomeIcon icon={faCirclePlus} />} className="ts-16"></CButton>
                </CSpace>
            )
        }
    ] as TableColumnsType<ICustomer>;

    const defaultCheckedList = columns.slice(0, 4).map((item) => item.key as string);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const newColumns = columns.map((item, index) => ({
        ...item,
        hidden: index !== 0 && index !== columns.length - 1 && !checkedList.includes(item.key as string),
    }));

    const expandedRowRender = (record: ICustomer) => {
        const columns = [
            { title: "Ngày", dataIndex: "date", key: "date", render: (date: string) => <p>{formatDate(date)}</p> },
            { title: "Thời gian", dataIndex: "time", key: "time" },
            { title: "Nha sĩ", dataIndex: "doctor_name", key: "doctor_name" },
            { title: "Tổng giá", dataIndex: "total_price", key: "total_price", render: (total_price: number) => ( <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(total_price))}</span> ) },
            {
                title: "Chi tiết",
                key: "detail",
                render: (item: IHistory) => (
                    <CButton onClick={() => {
                        setHistoryId(item?.id || '');
                        handleToggleDrawer();
                    }}
                    tooltip="Chi tiết khám" type="dashed" size="small" shape="circle"
                    icon={<FontAwesomeIcon icon={faInfo} />} className="ts-16"></CButton>
                ),
            },
        ];
    
        const data = record.histories?.map((history, index) => ({
            key: index.toString(),
            date: history.date,
            time: history.time,
            doctor_name: history?.doctor?.name,
            total_price: history.total_price,
            id: history.id
        }));
    
        return data && data.length > 0 ? (
            <>
                <CTitle level={5}>Lịch sử khám</CTitle>
                <CTable columns={columns} dataSource={data} pagination={false} size="small" />
                <DrawerComponent historyId={historyId} drawer={drawer} toggle={handleToggleDrawer} />
            </>
        ) : (
            <CTitle level={5}>Không có lịch sử khám</CTitle>
        );
    };

    return (
        <>
            <Checkbox.Group
                className="gap-4 my-3"
                value={checkedList}
                options={columns.slice(1, columns.length - 1).map(({ key, title }) => ({
                    label: title,
                    value: key,
                })) as CheckboxOptionType[]}
                onChange={(value) => {
                    setCheckedList(value as string[]);
                }}
            />
            <CTable
                columns={newColumns}
                dataSource={customer?.data?.map((item: ICustomer, index: number) => ({ ...item, index: index + 1, key: item.id })) || []}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "15"] }}
                expandable={{ expandedRowRender }}
            />
        </>
    );
}