import { GENDER, ROLE, STATUS } from "@/commons/Option";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CEditor from "@/custom_antd/CEditor";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import CUploadImage from "@/custom_antd/CUploadImage";
import { IUser } from "@/interfaces/IUser";
import { htmlToEditor } from "@/utils/FunctionHelpers";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { DatePicker, Form, Input } from "antd";
import { useEffect } from "react";
import dayjs from 'dayjs';


interface FormComponentProps {
    onSubmit: (values: IUser) => void;
    data?: IUser;
}

const initialUser: IUser = {
    avatar: '',
    name: '',
    phone_number: '',
    email: '',
    gender: 0,
    address: '',
    role_id: 1,
    status: 1,
    password: '',
    description: ''
}

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                birthday: dayjs(data?.birthday) || '',
                role_id: data.role?.id,
                description: htmlToEditor(data?.description as string),
                password: ''
            });
        }
    }, [form, data]);

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialUser} form={form}>
            <Form.Item label="Hình đại diện" className="!mb-4" name="avatar" rules={[{ required: true, message: "Hãy hình đại diện..." }]}>
                <CUploadImage setImageUrl={(value: string) => form.setFieldsValue({ avatar: value })} initialImageUrl={data?.avatar} />
            </Form.Item>
            <CRow gutter={[16, 16]}>
                <CCol span={8}>
                    <Form.Item label="Họ và tên người dùng" className="!mb-4" name="name" rules={[{ required: true, message: "Hãy nhập họ và tên người dùng..." }]}>
                        <CInput className="!h-[40px]" placeholder="Họ và tên người dùng" />
                    </Form.Item>
                </CCol>
                <CCol span={4}>
                    <Form.Item label="Ngày sinh" className="!mb-4" name="birthday" rules={[{ required: true, message: "Hãy chọn ngày sinh..." }]}>
                        <DatePicker className="h-10 w-full" placeholder="YYYY-MM-DD" format='YYYY-MM-DD' allowClear={false} />
                    </Form.Item>
                </CCol>
                <CCol span={4}>
                    <Form.Item label="Giới tính" className="!mb-4" name="gender" rules={[{ required: true }]}>
                        <CSelect className="!h-[40px]" options={GENDER} />
                    </Form.Item>
                </CCol>
                <CCol span={4}>
                    <Form.Item label="Chức vụ" className="!mb-4" name="role_id" rules={[{ required: true }]}>
                        <CSelect className="!h-[40px]" options={ROLE} />
                    </Form.Item>
                </CCol>
                <CCol span={4}>
                    <Form.Item label="Trạng thái" className="!mb-4" name="status" rules={[{ required: true }]}>
                        <CSelect className="!h-[40px]" options={STATUS} />
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
                    <Form.Item label="Email" className="!mb-4" name="email" rules={[{ required: true, message: "Hãy nhập email..." }]}>
                        <CInput className="!h-[40px]" placeholder="Email" />
                    </Form.Item>
                </CCol>

                <CCol span={8}>
                    {data ?
                        <Form.Item label="Mật khẩu" className="!mb-4" name="password">
                            <Input.Password
                                disabled
                                className="!h-[40px]"
                                placeholder="Mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        :
                        <Form.Item label="Mật khẩu" className="!mb-4" name="password" rules={[{ required: true, message: "Hãy nhập mật khẩu..." }]}>
                            <Input.Password
                                className="!h-[40px]"
                                placeholder="Mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                    }

                </CCol>
            </CRow>
            <Form.Item label="Địa chỉ" className="!mb-10" name="address" rules={[{ required: true, message: "Hãy nhập địa chỉ..." }]}>
                <CInput className="!h-[40px]" placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item label="Mô tả" className="!mb-10" name="description">
                <CEditor initialDes={htmlToEditor(data?.description as string)} />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}