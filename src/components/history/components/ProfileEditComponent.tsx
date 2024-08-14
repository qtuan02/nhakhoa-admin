import CCol from "@/custom_antd/CCol";
import CDescriptionItem from "@/custom_antd/CDescriptionItem";
import CRow from "@/custom_antd/CRow";
import { IHistory } from "@/interfaces/IHistory";
import { Divider, TableColumnsType } from "antd";
import CButton from "@/custom_antd/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import CTable from "@/custom_antd/CTable";
import DrawerComponent from "./DrawerComponent";
import { formatDate } from "@/utils/FunctionHelpers";
import { useState } from "react";

interface ProfileComponentProps {
    data?: IHistory;
}

export default function ProfileEditComponent({ data }: ProfileComponentProps) {

    const [ drawer, setDrawer ] = useState<boolean>(false);
    const [ historyId, setHistoryId ] = useState<string>("");

    const handleToggleDrawer = () => {
        setDrawer(!drawer);
    }

    const columns: TableColumnsType<IHistory> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        { title: "Ngày", dataIndex: "date", key: "date", render: (date) => <p>{formatDate(date)}</p> },
        { title: "Thời gian", dataIndex: "time", key: "time" },
        { title: "Nha sĩ", dataIndex: "doctor_name", key: "doctor_name" },
        { title: "Tổng giá", dataIndex: "total_price", key: "total_price", render: (total_price: number) => (<span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(total_price))}</span>) },
        {
            title: "Chi tiết",
            key: "detail",
            render: (item: IHistory) => (
                <CButton onClick={() => {
                    setHistoryId(item?.id || "");
                    handleToggleDrawer();
                }}
                    tooltip="Chi tiết khám" type="dashed" size="small" shape="circle"
                    icon={<FontAwesomeIcon icon={faInfo} />} className="ts-16"></CButton>
            ),
        },
    ] as TableColumnsType<IHistory>;

    return (
        <CRow gutter={[16, 16]}>
            <CCol span={10}>
                <Divider>Thông tin khách hàng</Divider>
                <CDescriptionItem title="Ngày khám" content={formatDate(data?.date)} />
                <CDescriptionItem title="Thời gian" content={data?.time} />
                <CDescriptionItem title="Họ và tên" content={data?.customer?.name} />
                <CDescriptionItem title="Giới tính" content={data?.customer?.gender === 1 ? "Nam" : "Nữ"} />
                <CDescriptionItem title="Ngày sinh" content={formatDate(data?.customer?.birthday)} />
                <CDescriptionItem title="Số điện thoại" content={data?.customer?.phone_number} />
                <CDescriptionItem title="Địa chỉ" content={data?.customer?.address} />
                <Divider>Thông tin nha sĩ</Divider>
                <CDescriptionItem title="Họ tên" content={data?.doctor?.name} />
                <CDescriptionItem title="Giới tính" content={data?.doctor?.gender === 1 ? "Nam" : "Nữ"} />
                <CDescriptionItem title="Ngày sinh" content={formatDate(data?.doctor?.birthday)} />
                <CDescriptionItem title="Số điện thoại" content={data?.doctor?.phone_number} />
            </CCol>
            <CCol span={14}>
                <Divider>Lịch sử khám</Divider>
                {data?.customer?.histories && data?.customer?.histories.length > 0 ?
                    <CTable 
                        columns={columns}
                        dataSource={data?.customer?.histories?.map((item, index) => ({ ...item, index: index + 1, key: item.id, doctor_name: item.doctor?.name }))}
                        pagination={false}
                    /> :
                    <p>Không tìm thấy lịch sử khám...</p>
                }
                <DrawerComponent historyId={historyId} drawer={drawer} toggle={handleToggleDrawer} />
            </CCol>
        </CRow>
    );
}