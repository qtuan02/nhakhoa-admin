import CButton from "@/custom_antd/CButton";
import CEditor from "@/custom_antd/CEditor";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { IUser } from "@/interfaces/IUser";
import { htmlToEditor } from "@/utils/FunctionHelpers";
import { Form } from "antd";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


interface FormComponentProps {
    onSubmit: (values: IUser) => void;
    data?: IUser;
}

const initialUser: IUser = {
    name: "",
    description: ""
}

export default function FormTranslateComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [form, data]);

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialUser} form={form}>
            <Form.Item label="Họ và tên nha sĩ" className="!mb-4" name="name" rules={[{ required: true }]}>
                <CInput className="!h-[40px]" placeholder="Họ và tên nha sĩ" />
            </Form.Item>
            <Form.Item label="Mô tả" className="!mb-10" name="description">
                <CEditor initialDes={htmlToEditor(data?.description as string)} />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" icon={<FontAwesomeIcon icon={faSave} />} htmlType="submit">Lưu</CButton>
            </CRow>
        </Form>
    );
}