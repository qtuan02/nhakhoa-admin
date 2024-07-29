import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import CTag from "@/custom_antd/CTag";
import CCard from "@/custom_antd/CCard";
import CTable from "@/custom_antd/CTable";
import CTitle from "@/custom_antd/CTitle";
import CButton from "@/custom_antd/CButton";
import { formatDate, parseDayjsToString } from "@/utils/FunctionHelpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faFileExcel, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStatisticState } from "@/redux/reducers/statisticReducer";
import { statisticHistoryThunk } from "@/redux/thunks/statisticThunk";
import { DatePicker, Flex, Form, Skeleton, TableColumnsType } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { IStatisticAction } from "@/interfaces/IStatistic";
import { IHistory } from "@/interfaces/IHistory";
import { useState } from "react";
import { exportApi } from "@/api/exportApi";

export default function HistoryComponent() {
    const dispatch = useAppDispatch();
    const statistic = useAppSelector(getStatisticState);
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<IStatisticAction>({ begin: '', end: '' });

    const handleSubmit = (value: any) => {
        const [begin, end] = value.date;
        const data: IStatisticAction = {
            begin: parseDayjsToString(begin),
            end: parseDayjsToString(end)
        };
        setDate(data);
        dispatch(statisticHistoryThunk(data));
    }

    const handleExport = async () => {
        setLoading(true);
        const file = exportApi.exportHistory(date.begin, date.end);
        setLoading(false);
    }

    const columns: TableColumnsType<IHistory> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 70,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            width: 230,
        },
        {
            title: "Tên nha sĩ",
            dataIndex: "doctor_name",
            key: "doctor_name",
            width: 230,
        },
        {
            title: "Ngày hẹn",
            dataIndex: "date",
            key: "date",
            width: 150,
            render: (date) => <p>{formatDate(date)}</p>
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: 120,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 100,
            filters: [
                { text: "Đang chờ", value: 0 },
                { text: "Hoàn thành", value: 1 },
                { text: "Xác nhận", value: 2 },
            ],
            onFilter: (value, item) => item.status === value,
            render: (status) => {
                let icon, color, text;
                switch (status) {
                    case 0:
                        icon = <ClockCircleOutlined />
                        color = "processing"
                        text = "Đang chờ"
                        break;
                    case 1:
                        icon = <CheckCircleOutlined />
                        color = "success"
                        text = "Hoàn thành"
                        break;
                    case 2:
                        icon = <CloseCircleOutlined />
                        color = "error"
                        text = "Hủy"
                        break;
                }
                return <CTag icon={icon} color={color}><span className="ml-2">{text}</span></CTag>;
            }
        }
    ] as TableColumnsType<IHistory>;

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
                        {date.begin && date.end ? <CButton loading={loading} type="default" size="middle" icon={<FontAwesomeIcon icon={faFileExcel} />} onClick={handleExport}>Export</CButton> : <></>}
                    </CCol>
                </Flex>
            </Form>
            <Skeleton loading={statistic.loadingHistory}>
                {statistic.dataHistory ?
                    <>
                        <CRow gutter={[16, 16]}>
                            {statistic.dataHistory?.turnover?.map((item, index) =>
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
                            dataSource={statistic.dataHistory?.history?.map((item: IHistory, index: number) => ({ ...item, index: index + 1, key: item.id, customer_name: item.customer?.name, doctor_name: item.doctor?.name })) || []}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "15"] }}
                        />
                    </>
                    : <></>
                }
            </Skeleton>
        </>
    );
}