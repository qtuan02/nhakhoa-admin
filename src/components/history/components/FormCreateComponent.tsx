import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CDatePicker from "@/custom_antd/CDatePicker";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { ITime } from "@/interfaces/IAppointment";
import { IHistory } from "@/interfaces/IHistory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCustomerState } from "@/redux/reducers/customerReducer";
import { getDoctorState } from "@/redux/reducers/doctorReducer";
import { getHistoryState, removeService } from "@/redux/reducers/historyReducer";
import { getTimeState } from "@/redux/reducers/timeReducer";
import { customersThunk } from "@/redux/thunks/customerThunk";
import { doctorsThunk } from "@/redux/thunks/doctorThunk";
import { timesThunk } from "@/redux/thunks/timeThunk";
import { faCirclePlus, faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Form, Image, Input, Select, TableColumnsType } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CTitle from "@/custom_antd/CTitle";
import CSpace from "@/custom_antd/CSpace";
import { IUser } from "@/interfaces/IUser";
import { doctorApi } from "@/api/doctorApi";
import { customNumberPrice, parseDayjsToString } from "@/utils/FunctionHelpers";
import { IService } from "@/interfaces/IService";
import CTable from "@/custom_antd/CTable";
import ModalComponent from "./ModalComponent";

interface FormComponentProps {
    onSubmit: (values: IHistory) => void;
}

const initialHistory: IHistory = {
    customer_id: undefined,
    doctor_id: undefined,
    date: "",
    time: "",
    note: "",
    services: [],
}

export default function FormCreateComponent({ onSubmit }: FormComponentProps) {
    const { id } = useParams();
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const time = useAppSelector(getTimeState);
    const doctor = useAppSelector(getDoctorState);
    const history = useAppSelector(getHistoryState);
    const customer = useAppSelector(getCustomerState);

    const [dataDoctor, setDataDoctor] = useState<IUser[]>([]);
    const [loadingDoctor, setLoadingDoctor] = useState<boolean>(false);

    const [modal, setModal] = useState<boolean>(false);

    const handleToggleModal = () => {
        setModal(!modal);
    }

    const getDataDoctor = async (date: string | undefined, time: string | undefined) => {
        if (!date || !time) return;
        setLoadingDoctor(true);
        const doctors = await doctorApi.getDoctor(date, time);
        setLoadingDoctor(false);
        setDataDoctor(doctors);
    }

    useEffect(() => {
        if (time.status === "completed" || time.status === "rejected") {
            dispatch(timesThunk());
        }

        if (history.appointment) {
            if (!history.appointment.doctor_id) {
                getDataDoctor(history.appointment.date, history.appointment.time);
            }

            form.setFieldsValue({
                doctor_id: history.appointment?.doctor_id || "--Hãy chọn nha sĩ",
                date: dayjs(history.appointment.date),
                time: history.appointment.time,
                note: history.appointment.note
            });
        }

        if (customer.status === "completed" || customer.status === "rejected") {
            dispatch(customersThunk());
        }

        if (doctor.status === "completed" || doctor.status === "rejected") {
            dispatch(doctorsThunk());
        }

        if (id) {
            form.setFieldValue("customer_id", id);
        }

    }, [customer.status, dispatch, doctor.status, form, history.appointment, id, time.status]);

    const handleDisabledPast = (current: any) => {
        return current && (current.valueOf() < Date.now() || current.day() === 0);
    };

    const columns: TableColumnsType<IService> = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <Image width={40} height={40} src={image} alt="img..." />
            )
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            editable: true,
            width: 200,
            render: (price: number) => (customNumberPrice(price))
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            editable: true,
            width: 150,
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Thao tác",
            key: "item",
            width: 300,
            render: (item) => (
                <CSpace>
                    <CButton tooltip="Xóa" type="primary" danger size="small" onClick={() => dispatch(removeService(item?.id || -1))} icon={<FontAwesomeIcon icon={faTrashCan} />}></CButton>
                </CSpace>
            )
        }
    ] as TableColumnsType<IService>;

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialHistory} form={form}>
            {history.appointment ?
                <CTitle level={5} className="!mb-4"><span className="!text-red-600">
                    <CButton shape="circle" link="/khach-hang/them" type="primary" size="small" tooltip="Thêm khách hàng" icon={<FontAwesomeIcon icon={faCirclePlus} />}></CButton>
                </span> Khách hàng: <span className="!font-normal">{history.appointment?.name}</span> - Số điện thoại: <span className="!font-normal">{history.appointment?.phone}</span></CTitle>
                : <></>}
            <Form.Item label="Khách hàng" className="!mb-4" name="customer_id" rules={[{ required: true, message: "Hãy chọn khách hàng..." }]}>
                <CSelect
                    loading={customer.loading}
                    className="!h-[40px]"
                    showSearch
                    placeholder="Chọn khách hàng..."
                    options={customer?.data?.map(c => ({ value: c.id, label: c.name + " ( Mã: " + c.id + ", Số điện thoại: " + c.phone_number + " )" })) || []}
                    filterOption={(input, option) =>
                        (option?.label as string ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                />
            </Form.Item>
            <CRow gutter={[16, 16]}>
                <CCol span={6}>
                    <Form.Item label="Ngày" className="!mb-4" name="date" rules={[{ required: true, message: "Hãy chọn ngày.." }]}>
                        <CDatePicker disabledDate={handleDisabledPast} className="h-10 w-full ts-16" placeholder="--Chọn ngày" format="DD/MM/YYYY" />
                    </Form.Item>
                </CCol>
                <CCol span={6}>
                    <Form.Item label="Thời gian" className="!mb-4" name="time" rules={[{ required: true, message: "Hãy chọn giờ.." }]}>
                        <CSelect loading={time.loading} className="!h-10 ts-16" onChange={() => getDataDoctor(parseDayjsToString(form.getFieldValue("date")), form.getFieldValue("time"))}>
                            <Select.Option value="">--Chọn giờ</Select.Option>
                            {time?.data?.map((t: ITime) => (
                                <Select.Option key={t.time} value={t.time}>{t.time}</Select.Option>
                            )) || []}
                        </CSelect>
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    {!dataDoctor || dataDoctor.length === 0 ?
                        <Form.Item label="Nha sĩ" className="!mb-4" name="doctor_id" rules={[{ required: true, message: "Hãy chọn nha sĩ..." }]}>
                            <CSelect
                                loading={doctor.loading}
                                className="!h-[40px]"
                                showSearch
                                placeholder="Chọn nha sĩ..."
                                options={doctor?.data?.map(u => ({ value: u.id, label: u.name })) || []}
                                filterOption={(input, option) =>
                                    (option?.label as string ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                            />
                        </Form.Item> :
                        <Form.Item label="Nha sĩ" className="!mb-4" name="doctor_id" rules={[{ required: true, message: "Hãy chọn nha sĩ..." }]}>
                            <CSelect
                                loading={loadingDoctor}
                                className="!h-[40px]"
                                showSearch
                                placeholder="Chọn nha sĩ..."
                                options={dataDoctor?.map(u => ({ value: u.id, label: u.name })) || []}
                                filterOption={(input, option) =>
                                    (option?.label as string ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                            />
                        </Form.Item>
                    }
                </CCol>
            </CRow>
            <Form.Item label="Dịch vụ:" name="services">
                <div>
                    <CButton type="primary" className="rounded-lg" onClick={() => handleToggleModal()}>Chọn dịch vụ</CButton>
                    {history && history.services?.length === 0 ?
                        <p className="mt-2 ml-1 text-[14px] text-red-500">Chưa chọn dịch vụ nào...</p>
                        :
                        <CTable
                            className="table-modal !mt-2"
                            rowClassName="editable-row"
                            columns={columns}
                            dataSource={history?.services?.map((item: IService, index: number) => ({ ...item, index: index + 1, key: item.id, quantity: item.quantity ? item.quantity : 1, price: item.price ? item.price : item.min_price })) || []}
                            pagination={false}
                        />
                    }
                    <ModalComponent modal={modal} toggle={handleToggleModal} />
                </div>
            </Form.Item>
            <Form.Item label="Ghi chú:" name="note">
                <Input.TextArea
                    showCount
                    maxLength={1000}
                    placeholder="Nhập nội dung..."
                    className="ts-16"
                    style={{ height: 200, resize: "none" }}
                />
            </Form.Item>
            <br />
            <CRow className="gap-4 justify-end">
                <CButton type="primary" icon={<FontAwesomeIcon icon={faSave} />} htmlType="submit">Lưu</CButton>
            </CRow>
        </Form>
    );
}