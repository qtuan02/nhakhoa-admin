import { userApi } from "@/api/userApi";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useState } from "react";

interface IModalComponentProps {
    userId: string,
    modal: boolean,
    toggle: () => void
}

const initialPassword = {
    password: ""
}

export default function ModalComponent({ userId, modal, toggle}: IModalComponentProps ) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        form.resetFields();
        toggle();
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        const res = await userApi.changePassword(userId, values.password);
        setLoading(false);
        if(res) {
            TOAST_SUCCESS(res.message);
        }
    };

    return (
        <Modal title={"Đổi mật khẩu"} open={modal} onCancel={handleCancel} footer={null}>
            <CSkeleton loading={loading}>
                <Form layout="vertical" initialValues={initialPassword} form={form} onFinish={handleSubmit}>
                    <Form.Item className="!mb-4" name="password" rules={[{ required: true, message: "Hãy nhập mật khẩu..." }]}>
                        <Input.Password
                            className="!h-[40px]"
                            placeholder="Mật khẩu mới"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <CRow className="gap-4 justify-end">
                        <CButton type="primary" htmlType="submit">Lưu</CButton>
                    </CRow>
                </Form>
            </CSkeleton>
        </Modal>
    );
}