import { changePassword, editUser } from "@/apis";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import { IUser } from "@/interfaces/IUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleModal } from "@/redux/reducers/userReducer";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useState } from "react";

const initialUser: IUser = {
    password: ''
}

export default function ModalComponent() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const isModalOpen = useAppSelector((state) => state.user.modal);
    const user_id = useAppSelector((state) => state.user.user_id);
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        form.resetFields();
        dispatch(toggleModal());
    };

    const handleSubmit = async (value: IUser) => {
        setLoading(true);
        const res = await changePassword(user_id as string, value.password as string);
        setLoading(false);
        if(res) {
            TOAST_SUCCESS(res.message);
        }
    };

    return (
        <Modal title={"Đổi mật khẩu"} open={isModalOpen} onCancel={handleCancel} footer={null}>
            <CSkeleton loading={loading}>
                <Form layout="vertical" initialValues={initialUser} form={form} onFinish={handleSubmit}>
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