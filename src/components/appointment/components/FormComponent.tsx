import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CDatePicker from "@/custom_antd/CDatePicker";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { IAppointment, IDate, ITime } from "@/interfaces/IAppointment";
import { IUser } from "@/interfaces/IUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Form, Input, List, Select } from "antd";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import dayjs from "dayjs";
import { STATUS_APPOINTMENT } from "@/utils/Option";
import { formatDate } from "@/utils/FunctionHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { IService } from "@/interfaces/IService";
import { getUserState } from "@/redux/reducers/userReducer";
import { getAppointmentState, removeService, setServices } from "@/redux/reducers/appointmentReducer";
import { usersThunk } from "@/redux/thunks/userThunk";
import { getTimeState } from "@/redux/reducers/timeReducer";
import { timesThunk } from "@/redux/thunks/timeThunk";
import { scheduleApi } from "@/api/scheduleApi";
import { getDoctorState } from "@/redux/reducers/doctorReducer";
import { doctorsThunk } from "@/redux/thunks/doctorThunk";

interface FormComponentProps {
    onSubmit: (values: IAppointment) => void;
    data?: IAppointment;
}

const initialAppointment: IAppointment = {
    name: "",
    phone: "",
    doctor_id: "",
    date: "",
    time: "",
    services: [],
    note: "",
    status: 0,
}

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const time = useAppSelector(getTimeState);
    const user = useAppSelector(getUserState);
    const doctor = useAppSelector(getDoctorState);
    const appointment = useAppSelector(getAppointmentState);

    const [ dataDate, setDataDate ] = useState<IDate[]>([]);
    const [ loadingDate, setLoadingDate ] = useState<boolean>(false);

    const [ dataTime, setDataTime ] = useState<ITime[]>([]);
    const [ loadingTime, setLoadingTime ] = useState<boolean>(false);

    const [ modal, setModal ] = useState<boolean>(false);

    const getDataDateByDoctorId = async (doctor_id: string) => {
        setLoadingDate(true);
        const res = await scheduleApi.getDate(doctor_id);
        setLoadingDate(false); 
        setDataDate(res);
    }

    const getDataTimeByDoctorIdAndDate = async (doctor_id: string, date: string) => {
        setLoadingTime(true);
        const res = await scheduleApi.getTime(doctor_id, date);
        setLoadingTime(false);
        setDataTime(res);
    }

    useEffect(() => {
        if(user.status === "completed" || user.status === "rejected") {
            dispatch(usersThunk());
        }

        if (time.status === "completed" || time.status === "rejected") {
            dispatch(timesThunk());
        }

        if (data) {
            if(data.services){
                dispatch(setServices(data.services));
            }

            if(data.doctor && data.time) {
                getDataDateByDoctorId(data.doctor.id || '');
                getDataTimeByDoctorIdAndDate(data.doctor.id || '', data.date || '');
            }

            form.setFieldsValue({
                ...data,
                doctor_id: data?.doctor?.id || "",
                date: data.doctor ? dayjs(data?.date).format("YYYY-MM-DD") || "" : dayjs(data?.date) || "",
            });
        }

        if(doctor.status === "completed" || user.status === "rejected") {
            dispatch(doctorsThunk());
        }

    }, [data, dispatch, doctor.status, form, time.status, user.status]);

    const handleDisabledPast = (current: any) => {
        return current && (current.valueOf() < Date.now() || current.day() === 0);
    };

    const handleDoctorChange = (doctor_id: string) => {
        form.setFieldsValue({ date: "", time: "" });
        getDataDateByDoctorId(doctor_id);
    };

    const handleDateChange = (date: string) => {
        form.setFieldsValue({ time: "" });
        getDataTimeByDoctorIdAndDate(form.getFieldValue("doctor_id"), date);
    }

    const handleToggleModal = () => {
        setModal(!modal);
    }

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialAppointment} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol span={12}>
                    <Form.Item label="Họ và tên:" className="!mb-4" name="name" rules={[{ required: true, message: "Chưa nhập họ và tên..." }]}>
                        <CInput className="!h-[40px]" placeholder="Họ và tên" />
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    <CRow gutter={[16, 16]}>
                        <CCol span={12}>
                            <Form.Item label="Số điện thoại:" className="!mb-4" name="phone" rules={[{ required: true, message: "Chưa nhập số điện thoại..." }]}>
                                <CInput className="!h-[40px]" placeholder="Số điện thoại" />
                            </Form.Item>
                        </CCol>
                        <CCol span={12}>
                            <Form.Item label="Trạng thái:" className="!mb-4" name="status">
                                <CSelect className="!h-10 ts-16" options={STATUS_APPOINTMENT} />
                            </Form.Item>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow gutter={[16, 16]}>
                <CCol span={12}>
                    <Form.Item label="Chọn nha sĩ:" className="!mb-4" name="doctor_id">
                        <CSelect loading={user.loading} className="!h-10 ts-16" onChange={handleDoctorChange}>
                            <Select.Option value="">--Không chọn nha sĩ</Select.Option>
                            {doctor?.data?.map((d: IUser) => (
                                <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
                            )) || []}
                        </CSelect>
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    {form.getFieldValue("doctor_id") ?
                        <CRow gutter={[16, 16]}>
                            <CCol span={12}>
                                <Form.Item label="Chọn ngày:" className="!mb-4" name="date" rules={[{ required: true, message: "Chưa chọn ngày..." }]}>
                                    <CSelect loading={loadingDate} className="!h-10 ts-16" onChange={handleDateChange}>
                                        <Select.Option value="">--Chọn ngày</Select.Option>
                                        {dataDate?.map((d: IDate) => (
                                            <Select.Option key={d.date} value={d.date}>{formatDate(d.date)}</Select.Option>
                                        )) || []}
                                    </CSelect>
                                </Form.Item>
                            </CCol>
                            <CCol span={12}>
                                <Form.Item label="Chọn giờ:" className="!mb-4" name="time" rules={[{ required: true, message: "Chưa chọn giờ..." }]}>
                                    <CSelect loading={loadingTime} className="!h-10 ts-16">
                                        <Select.Option value="">--Chọn giờ</Select.Option>
                                        {dataTime?.map((t: ITime) => (
                                            <Select.Option key={t.time} value={t.time}>{t.time}</Select.Option>
                                        )) || []}
                                    </CSelect>
                                </Form.Item>
                            </CCol>
                        </CRow>
                        :
                        <CRow gutter={[16, 16]}>
                            <CCol span={12}>
                                <Form.Item label="Chọn ngày:" className="!mb-4" name="date" rules={[{ required: true, message: "Chưa chọn ngày..." }]}>
                                    <CDatePicker disabledDate={handleDisabledPast} className="h-10 w-full ts-16" placeholder="--Chọn ngày" format="DD/MM/YYYY" />
                                </Form.Item>
                            </CCol>
                            <CCol span={12}>
                                <Form.Item label="Chọn giờ:" className="!mb-4" name="time" rules={[{ required: true, message: "Chưa chọn giờ..." }]}>
                                    <CSelect loading={time.loading} className="!h-10 ts-16">
                                        <Select.Option value="">--Chọn giờ</Select.Option>
                                        {time?.data?.map((t: ITime) => (
                                            <Select.Option key={t.time} value={t.time}>{t.time}</Select.Option>
                                        )) || []}
                                    </CSelect>
                                </Form.Item>
                            </CCol>
                        </CRow>
                    }
                </CCol>
            </CRow>
            <Form.Item label="Chọn dịch vụ:" className="!mb-4" name="services">
                <div>
                    <CButton type="primary" className="rounded-lg" onClick={() => handleToggleModal() }>Chọn dịch vụ</CButton>
                    {appointment.services && appointment.services.length === 0 ?
                        null
                        :
                        <List
                            itemLayout="horizontal"
                            dataSource={appointment.services}
                            renderItem={(item: IService, index: number) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar shape="square" size="large" src={item?.image} />}
                                        title={<CRow justify="space-between">{item?.name}<CButton type="primary" danger size="small" onClick={() => dispatch(removeService(item?.id || ''))}>Xóa</CButton></CRow>}
                                        description={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(item?.min_price)) + "/" + item?.unit}
                                    />
                                </List.Item>
                            )}
                        />
                    }
                    <ModalComponent modal={modal} toggle={handleToggleModal} />
                </div>
            </Form.Item>
            <Form.Item label="Ghi chú:" name="note">
                <Input.TextArea
                    showCount
                    maxLength={500}
                    placeholder="Thông tin thêm"
                    className="ts-16"
                    style={{ height: 150, resize: "none" }}
                />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton disabled={data?.status === 2 || data?.status === 3 ? true : false} type="primary" icon={<FontAwesomeIcon icon={data ? faPenToSquare : faSave} />} htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}