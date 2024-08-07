import CButton from "@/custom_antd/CButton";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { ICategory } from "@/interfaces/ICategory";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input } from "antd";
import { useEffect } from "react";

interface FormComponentProps {
    onSubmit: (values: ICategory) => void;
    data?: ICategory;
}

const initialCategory: ICategory = {
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
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialCategory} form={form}>
            <Form.Item label="Tên danh mục" className="!mb-4" name="name" rules={[{ required: true }]}>
                <CInput className="!h-[40px]" placeholder="Tên danh mục" />
            </Form.Item>
            <Form.Item label="Mô tả" className="!mb-10" name="description" rules={[{ required: true }]}>
                <Input.TextArea
                    showCount
                    maxLength={1000}
                    placeholder="Thông tin mô tả"
                    style={{ height: 120, resize: "none" }}
                />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" icon={<FontAwesomeIcon icon={faSave} />} htmlType="submit">Lưu</CButton>
            </CRow>
        </Form>
    );
}