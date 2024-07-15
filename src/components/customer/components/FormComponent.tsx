import { GENDER } from "@/commons/Option";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { ICustomer } from "@/interfaces/ICustomer";
import { DatePicker, Form, Input } from "antd";
import { useEffect } from "react";
import dayjs from 'dayjs';

interface FormComponentProps {
    onSubmit: (values: ICustomer) => void;
    data?: ICustomer;
}

const initialCustomer: ICustomer = {
    name: '',
    phone_number: '',
    birthday: '',
    email: '',
    gender: 0,
    address: '',
}

export default function FormComponent({ onSubmit, data }: FormComponentProps){
    const [form] = Form.useForm();

    useEffect(() => {
        if(data) {
            form.setFieldsValue({
                ...data,
                birthday: dayjs(data?.birthday) || '',
            });
        }
    }, [form, data]);

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialCustomer} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol span={16}>
                    <Form.Item label="Tên khách hàng" className="!mb-4" name="name" rules={[{ required: true, message: "Hãy nhập tên khách hàng..." }]}>
                        <CInput className="!h-[40px]" placeholder="Tên khách hàng" />
                    </Form.Item>
                </CCol>
                <CCol span={8}>
                    <Form.Item label="Email" className="!mb-4" name="email">
                        <CInput className="!h-[40px]" placeholder="Email" />
                    </Form.Item>
                </CCol>
            </CRow>
            <CRow gutter={[16, 16]}>
                <CCol span={8}>
                    <Form.Item label="Số điện thoại" className="!mb-4" name="phone_number" rules={[{ required: true, message: "Hãy nhập số điện thoại..." }]}>
                        <CInput type="number" className="!h-[40px]" placeholder="Số điện thoại" />
                    </Form.Item>
                </CCol>
                <CCol span={8}>
                    <Form.Item label="Ngày sinh" className="!mb-4" name="birthday" rules={[{ required: true, message: "Hãy chọn ngày sinh..." }]}>
                        <DatePicker className="h-10 w-full" placeholder="DD/MM/YYYY" format='DD/MM/YYYY' allowClear={false} />
                    </Form.Item>    
                </CCol>
                <CCol span={8}>
                    <Form.Item label="Giới tính" className="!mb-4" name="gender" rules={[{ required: true, message: "Hãy chọn giới tính.." }]}>
                        <CSelect className="!h-[40px]" options={GENDER} />
                    </Form.Item>
                </CCol>     
            </CRow>
            <Form.Item label="Địa chỉ" className="!mb-10" name="address">
                <Input.TextArea
                    showCount
                    maxLength={255}
                    placeholder="Địa chỉ"
                    style={{ height: 100, resize: 'none' }}
                />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}