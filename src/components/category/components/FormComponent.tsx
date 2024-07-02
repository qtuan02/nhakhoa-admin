import { STATUS } from "@/commons/Option";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import CUploadImage from "@/custom_antd/CUploadImage";
import { ICategory } from "@/interfaces/ICategory";
import { Form, Input } from "antd";
import { useEffect } from "react";

interface FormComponentProps {
    onSubmit: (values: ICategory) => void;
    data?: ICategory;
}

const initialCategory: ICategory = {
    image: '',
    name: '',
    status: 1,
    description: ''
}

export default function FormComponent({ onSubmit, data }: FormComponentProps){
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(data);
    }, [form, data]);

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialCategory} form={form}>
            <Form.Item label="Hình ảnh" className="!mb-4" name="image" rules={[{ required: true, message: "Hãy thêm ảnh danh mục..." }]}>
                <CUploadImage setImageUrl={(value: string) => form.setFieldsValue({ image: value })} initialImageUrl={data?.image} />
            </Form.Item>
            <CRow gutter={[16, 16]}>
                <CCol span={16}>
                    <Form.Item label="Tên danh mục" className="!mb-4" name="name" rules={[{ required: true, message: "Hãy nhập tên danh mục..." }]}>
                        <CInput className="!h-[40px]" placeholder="Tên danh mục" />
                    </Form.Item>
                </CCol>
                <CCol span={8}>
                    <Form.Item label="Trạng thái" className="!mb-4" name="status" rules={[{ required: true, message: "Hãy chọn trạng thái..." }]}>
                        <CSelect className="!h-[40px]" options={STATUS} />
                    </Form.Item>
                </CCol>
            </CRow>
            <Form.Item label="Mô tả" className="!mb-10" name="description">
                <Input.TextArea
                    showCount
                    maxLength={255}
                    placeholder="Thông tin mô tả"
                    style={{ height: 120, resize: 'none' }}
                />
            </Form.Item>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}