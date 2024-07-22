"use client";
import { ILogin } from "@/interfaces/ILogin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CButton from "@/custom_antd/CButton";
import CInput from "@/custom_antd/CInput";
import CTitle from "@/custom_antd/CTitle";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { login } from "@/apis";
import { setRemember } from "@/redux/reducers/authReducer";

const initialLogin: ILogin = {
    account: '',
    password: '',
    remember: false,
}

export default function LoginComponent() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const handleSubmit = (values: ILogin) => {
        dispatch(setRemember(values));
        dispatch(login(values));
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token') || '';
        if (token) {
            window.location.assign('/');
        }

        const user = JSON.parse(localStorage.getItem('r_u') || '{}');
        if (user) {
            form.setFieldsValue(user);
        }
    }, [form]);

    return (
        <div className="bg-login flex items-center justify-center">
            <Form layout="vertical" onFinish={handleSubmit} initialValues={initialLogin} form={form} autoComplete="off"
                className="form-login !pt-10 !px-20 w-[600px] h-[450px] rounded-2xl">
                <CTitle>Đăng nhập</CTitle>
                <Form.Item label="Tài khoản" className="!mb-4" name="account"
                    rules={[{ required: true, message: 'Hãy nhập tài khoản!' }]}>
                    <CInput size="large" placeholder="Email hoặc số điện thoại..." />
                </Form.Item>
                <Form.Item label="Mật khẩu" className="!mb-2" name="password"
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
                    <Input.Password size="large" placeholder="Mật khẩu..." />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" className="!mb-4">
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>
                <Form.Item>
                    <CButton loading={auth.loading} type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faHospital} />} size="large">Đăng nhập</CButton>
                </Form.Item>
            </Form>
        </div>
    );
}