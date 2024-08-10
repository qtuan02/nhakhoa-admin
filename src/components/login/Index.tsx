"use client";
import { ILogin } from "@/interfaces/ILogin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import CButton from "@/custom_antd/CButton";
import CInput from "@/custom_antd/CInput";
import CTitle from "@/custom_antd/CTitle";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Form, Input } from "antd";
import { loginThunk } from "@/redux/thunks/authThunk";
import { getAuthState } from "@/redux/reducers/authReducer";
import { appConfig } from "@/config/AppConfig";

const initialLogin: ILogin = {
    account: "admin@nhakhoa.com",
    password: "123456",
    remember: true,
}

export default function LoginComponent() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(getAuthState);

    const [form] = Form.useForm();

    const handleSubmit = (values: ILogin) => {
        dispatch(loginThunk(values));
    }
    
    useEffect(() => {
        if (auth.isLoggedIn) {
            if(auth.currentUser?.role === appConfig.R_1){
                window.location.assign("/");
            } else if (auth.currentUser?.role === appConfig.R_2){
                window.location.assign("/khach-hang");
            } else {
                window.location.assign("/lich-kham");
            }
        }
    }, [auth.currentUser?.role, auth.isLoggedIn]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("r_u") || "{}");
        if (user) {
            form.setFieldsValue(user);
        }
    }, [form]);

    return (
        <div className="bg-login flex items-center justify-center">
            <Form layout="vertical" onFinish={handleSubmit} initialValues={initialLogin} form={form}
                className="border-[2px] shadow-xl hover:shadow-2xl hover:cursor-pointer hover:bg-[rgba(240,255,255,.5)] bg-[rgba(240,255,255,1)] !pt-10 !px-20 w-[600px] h-[450px] rounded-2xl">
                <CTitle>Đăng nhập</CTitle>
                <Form.Item label="Tài khoản" className="!mb-4" name="account" rules={[{ required: true, message: "Hãy nhập tài khoản!" }]}>
                    <CInput size="large" placeholder="Email hoặc số điện thoại..." autoComplete="username" />
                </Form.Item>
                <Form.Item label="Mật khẩu" className="!mb-2" name="password" rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}>
                    <Input size="large" placeholder="Mật khẩu..." autoComplete="current-password" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" className="!mb-4">
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>
                <Form.Item>
                    <CButton loading={auth.logging} type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faHospital} />} size="large">Đăng nhập</CButton>
                </Form.Item>
            </Form>
        </div>
    );
}