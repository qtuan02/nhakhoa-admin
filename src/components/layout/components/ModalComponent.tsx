"use client";
import { authApi } from "@/api/authenticateApi";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { IChangepassword } from "@/interfaces/IChangepassword";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Modal } from "antd";
import { useState } from "react";

interface IModalComponentProps {
    modal: boolean,
    toggle: () => void
}

const initialChangepasswordForm: IChangepassword = {
    password: "",
    new_password: ""
}

export default function ModalComponent({ modal, toggle }: IModalComponentProps) {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: IChangepassword) => {
        setLoading(true);
        const res = await authApi.changPassword(values);
        setLoading(false);
        if(res) {
            TOAST_SUCCESS(res.message);
            handleCancel();
        }
    }

    const handleCancel = () => {
        form.resetFields();
        toggle();
    }

    return (
        <Modal open={modal} onCancel={handleCancel} footer={null}>
            <CTitle level={3} className="text-center">Đổi mật khẩu</CTitle>
            <Form layout="vertical" className="px-2 py-4" onFinish={handleSubmit} initialValues={initialChangepasswordForm} form={form}>
                <Form.Item label="Mật khẩu cũ" className="!mb-4" name="password" rules={[{ required: true, message: "Hãy nhập mật khẩu cũ..." }]}>
                    <Input.Password size="large" placeholder="Mật khẩu cũ..." />
                </Form.Item>
                <Form.Item label="Mật khẩu mới" className="!mb-4" name="new_password" rules={[{ required: true, message: "Hãy nhập mật khẩu mới..." }]}>
                    <Input.Password size="large" placeholder="Mật khẩu mới..." />
                </Form.Item>
                <CRow className="gap-4 justify-end">
                    <CButton loading={loading} type="primary" icon={<FontAwesomeIcon icon={faSave} />} htmlType="submit">Lưu</CButton>
                </CRow>
            </Form>
        </Modal>
    );
}