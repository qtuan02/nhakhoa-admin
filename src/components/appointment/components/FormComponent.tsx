import { getDate, getDoctors, getTimes, getUsers } from "@/apis";
import { getTime } from "@/apis/scheduleApi";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CDatePicker from "@/custom_antd/CDatePicker";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { IAppointment, IDate, ITime } from "@/interfaces/IAppointment";
import { IUser } from "@/interfaces/IUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeService, setDate, setServices, setTime, toggleModal } from "@/redux/reducers/appointmentReducer";
import { Avatar, Form, Input, List, Select } from "antd";
import { useEffect } from "react";
import ModalComponent from "./ModalComponent";
import dayjs from 'dayjs';
import { STATUS_APPOINTMENT } from "@/utils/Option";
import { formatDate } from "@/utils/FunctionHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { IService } from "@/interfaces/IService";

interface FormComponentProps {
    onSubmit: (values: IAppointment) => void;
    data?: IAppointment;
}

const initialAppointment: IAppointment = {
    name: '',
    phone: '',
    doctor_id: '',
    date: '',
    time: '',
    services: [],
    note: '',
    status: 0,
}

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const appointment = useAppSelector((state) => state.appointment);

    useEffect(() => {
        if(user.status === 'completed' || user.status === 'rejected') {
            dispatch(getUsers());
        }

        if (appointment.statusTime === 'completed' || appointment.statusTime === 'rejected') {
            dispatch(getTimes());
        }

        if (data) {
            if(data.services){
                dispatch(setServices(data.services));
            }
            if(data.doctor && data.time) {
                dispatch(getDate(data.doctor.id as string));
                dispatch(getTime({ doctor_id: data.doctor.id as string, date: data.date as string }));
            }
            form.setFieldsValue({
                ...data,
                doctor_id: data?.doctor?.id || '',
                date: data.doctor ? dayjs(data?.date).format('YYYY-MM-DD') || '' : dayjs(data?.date) || '',
            });
        }

        if(user.statusDoctors === 'completed' || user.statusDoctors === 'rejected') {
            dispatch(getDoctors());
        }

    }, [appointment.statusTime, data, dispatch, form, user.status, user.statusDoctors]);

    const handleDisabledPast = (current: any) => {
        return current && (current.valueOf() < Date.now() || current.day() === 0);
    };

    const handleDoctorChange = (doctorId: string) => {
        form.setFieldsValue({ date: '', time: '' });
        if (doctorId) {
            dispatch(getDate(doctorId));
            dispatch(setTime());
        } else {
            dispatch(setDate());
        }
    };

    const handleDateChange = (date: string) => {
        form.setFieldsValue({ time: '' });
        if (date) {
            dispatch(getTime({ doctor_id: form.getFieldValue("doctor_id"), date: date }));
        } else {
            dispatch(setTime());
        }
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
                            {user.doctors.map((d: IUser) => (
                                <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
                            ))}
                        </CSelect>
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    {form.getFieldValue("doctor_id") ?
                        <CRow gutter={[16, 16]}>
                            <CCol span={12}>
                                <Form.Item label="Chọn ngày:" className="!mb-4" name="date" rules={[{ required: true, message: "Chưa chọn ngày..." }]}>
                                    <CSelect loading={appointment.loadingDate} className="!h-10 ts-16" onChange={handleDateChange}>
                                        <Select.Option value="">--Chọn ngày</Select.Option>
                                        {appointment.date?.map((d: IDate) => (
                                            <Select.Option key={d.date} value={d.date}>{formatDate(d.date)}</Select.Option>
                                        ))}
                                    </CSelect>
                                </Form.Item>
                            </CCol>
                            <CCol span={12}>
                                <Form.Item label="Chọn giờ:" className="!mb-4" name="time" rules={[{ required: true, message: "Chưa chọn giờ..." }]}>
                                    <CSelect loading={appointment.loadingTime} className="!h-10 ts-16">
                                        <Select.Option value="">--Chọn giờ</Select.Option>
                                        {appointment.time?.map((t: ITime) => (
                                            <Select.Option key={t.time} value={t.time}>{t.time}</Select.Option>
                                        ))}
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
                                    <CSelect loading={appointment.loadingTimes} className="!h-10 ts-16">
                                        <Select.Option value="">--Chọn giờ</Select.Option>
                                        {appointment.times?.map((t: ITime) => (
                                            <Select.Option key={t.time} value={t.time}>{t.time}</Select.Option>
                                        ))}
                                    </CSelect>
                                </Form.Item>
                            </CCol>
                        </CRow>

                    }
                </CCol>
            </CRow>
            <Form.Item label="Chọn dịch vụ:" className="!mb-4" name="services">
                <div>
                    <CButton type="primary" className="rounded-lg" onClick={() => dispatch(toggleModal())}>Chọn dịch vụ</CButton>
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
                                        title={<CRow justify="space-between">{item?.name}<CButton type="primary" danger size="small" onClick={() => dispatch(removeService(item?.id || -1))}>Xóa</CButton></CRow>}
                                        description={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item?.min_price)) + "/" + item?.unit}
                                    />
                                </List.Item>
                            )}
                        />
                    }
                    <ModalComponent />
                </div>
            </Form.Item>
            <Form.Item label="Ghi chú:" name="note">
                <Input.TextArea
                    showCount
                    maxLength={500}
                    placeholder="Thông tin thêm"
                    className="ts-16"
                    style={{ height: 150, resize: 'none' }}
                />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" icon={<FontAwesomeIcon icon={data ? faPenToSquare : faSave} />} htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}