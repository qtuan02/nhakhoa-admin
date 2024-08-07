import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CEditor from "@/custom_antd/CEditor";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { IService } from "@/interfaces/IService";
import { htmlToEditor } from "@/utils/FunctionHelpers";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "antd";
import { useEffect } from "react";

interface FormComponentProps {
    onSubmit: (values: IService) => void;
    data?: IService;
}

const initialService: IService = {
    name: "",
    unit: "",
    description: "",
};

export default function FormTranslateComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [form, data]);

    return (
        <Form layout="vertical" className="px-2 py-4" initialValues={initialService} onFinish={onSubmit} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol xs={18}>
                    <Form.Item label="Tên dịch vụ" className="!mb-4" name="name" rules={[{ required: true }]}>
                        <CInput className="!h-[40px]" placeholder="Tên dịch vụ" />
                    </Form.Item>
                </CCol>
                <CCol xs={6}>
                    <Form.Item label="Đơn vị" className="!mb-4" name="unit" rules={[{ required: true }]}>
                        <CInput className="!h-[40px]" placeholder="Đơn vị tính" />
                    </Form.Item>
                </CCol>
            </CRow>
            <Form.Item label="Mô tả" className="!mb-10" name="description">
                <CEditor initialDes={htmlToEditor(data?.description as string)} />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" icon={<FontAwesomeIcon icon={faSave} />} htmlType="submit">Lưu</CButton>
            </CRow>
        </Form>
    );
}
