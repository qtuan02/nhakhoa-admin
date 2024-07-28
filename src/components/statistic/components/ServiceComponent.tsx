import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import CTag from "@/custom_antd/CTag";
import CCard from "@/custom_antd/CCard";
import CTable from "@/custom_antd/CTable";
import CTitle from "@/custom_antd/CTitle";
import CButton from "@/custom_antd/CButton";
import { customNumberPrice, parseDayjsToString } from "@/utils/FunctionHelpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faFileExcel, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStatisticState } from "@/redux/reducers/statisticReducer";
import { statisticServiceThunk } from "@/redux/thunks/statisticThunk";
import { DatePicker, Flex, Form, Skeleton, TableColumnsType } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { IStatisticAction, IStatisticServiceDetail } from "@/interfaces/IStatistic";
import { useState } from "react";
import { exportApi } from "@/api/exportApi";

export default function ServiceComponent() {
    const dispatch = useAppDispatch();
    const statistic = useAppSelector(getStatisticState);

    const [ date, setDate ] = useState<IStatisticAction>({ begin: '', end: '' });

    const handleSubmit = (value: any) => {
        const [begin, end] = value.date;
        const data: IStatisticAction = {
            begin: parseDayjsToString(begin),
            end: parseDayjsToString(end)
        };
        setDate(data);
        dispatch(statisticServiceThunk(data));
    }

    const handleExport = () => {
        exportApi.exportService(date.begin, date.end);
    }

    const columns: TableColumnsType<IStatisticServiceDetail> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Mã dịch vụ",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Đã bán/tháng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Đã bán",
            dataIndex: "quantity_sold",
            key: "quantity_sold",
        },
        {
            title: "Doanh thu",
            dataIndex: "total_price",
            key: "total_price",
            render: (total_price) => (<p>{customNumberPrice(total_price)}</p>)
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (<CTag icon={status === 1 ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />} color={status === 1 ? "green" : "error"}>{status === 1 ? "Hoạt động" : "Vô hiệu hóa"}</CTag>)
        },
    ] as TableColumnsType<IStatisticServiceDetail>;

    return (
        <>
            <Form onFinish={handleSubmit}>
                <Flex className="!h-10" justify="space-between">
                    <CCol>
                        <Flex gap={16}>
                            <Form.Item name="date" rules={[{ required: true, message: "" }]}>
                                <DatePicker.RangePicker size="middle" format="DD/MM/YYYY" />
                            </Form.Item>
                            <CButton type="primary" size="middle" icon={<FontAwesomeIcon icon={faPaperPlane} />} htmlType="submit">Thống kê</CButton>
                        </Flex>
                    </CCol>
                    <CCol>
                        { date.begin && date.end ? <CButton type="default" size="middle" icon={<FontAwesomeIcon icon={faFileExcel} />} onClick={handleExport}>Export</CButton> : <></> }
                    </CCol>
                </Flex>
            </Form>
            <Skeleton loading={statistic.loadingService}>
                {statistic.dataService ?
                    <>
                        <CRow gutter={[16, 16]}>
                            {statistic.dataService?.turnover?.map((item, index) =>
                                <CCol span={6} key={index}>
                                    <CCard style={{ width: "100%", height: "100px" }} className="border-solid bg-[#f9f9f9]">
                                        <CTitle level={5} className="!text-purple-700">{item.title}</CTitle>
                                        <p className="font-[600] text-blue-700 ts-16">{item.content}</p>
                                    </CCard>
                                </CCol>
                            )}
                        </CRow>
                        <CTable
                            className="mt-2"
                            bordered
                            columns={columns}
                            dataSource={statistic.dataService?.service?.map((item: IStatisticServiceDetail, index: number) => ({ ...item, index: index + 1, key: item.id })) || []}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "15"] }}
                        />
                    </>
                    : <></>
                }
            </Skeleton>
        </>
    );
}