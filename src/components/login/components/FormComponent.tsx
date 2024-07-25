import CButton from "@/custom_antd/CButton";
import CInput from "@/custom_antd/CInput";
import CTitle from "@/custom_antd/CTitle";
import { ILogin } from "@/interfaces/ILogin";
import { useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authenticateReducer";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Form, Input } from "antd";
import { useEffect } from "react";

interface FormComponentProps {
    onSubmit: (values: ILogin) => void;
    data?: ILogin;
}

const initialLogin: ILogin = {
    account: '',
    password: '',
    remember: false,
}

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();
    const { logging } = useAppSelector(getAuthenticateState);

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form])

    return (
        <Form layout="vertical" onFinish={onSubmit} initialValues={initialLogin} form={form} className="form-login !pt-10 !px-20 w-[600px] h-[450px] rounded-2xl">
            <CTitle>Đăng nhập</CTitle>
            <Form.Item label="Tài khoản" className="!mb-4" name="account" rules={[{ required: true, message: 'Hãy nhập tài khoản!' }]}>
                <CInput size="large" placeholder="Email hoặc số điện thoại..." autoComplete="username" />
            </Form.Item>
            <Form.Item label="Mật khẩu" className="!mb-2" name="password" rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
                <Input.Password size="large" placeholder="Mật khẩu..." autoComplete="current-password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" className="!mb-4">
                <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <Form.Item>
                <CButton loading={logging} type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faHospital} />} size="large">Đăng nhập</CButton>
            </Form.Item>
        </Form>
    );
}