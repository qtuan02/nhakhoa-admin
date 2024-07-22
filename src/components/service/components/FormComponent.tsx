import { STATUS } from "@/utils/Option";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CEditor from "@/custom_antd/CEditor";
import CInput from "@/custom_antd/CInput";
import CInputNumber from "@/custom_antd/CInputNumber";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import CUploadImage from "@/custom_antd/CUploadImage";
import { ICategory } from "@/interfaces/ICategory";
import { IService } from "@/interfaces/IService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { htmlToEditor } from "@/utils/FunctionHelpers";
import { faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "antd";
import { useEffect } from "react";
import { getCategorys } from "@/apis";


interface FormComponentProps {
  onSubmit: (values: IService) => void;
  data?: IService;
}

const initialService: IService = {
  image: '',
  name: '',
  quantity_sold: 0,
  category_id: 1,
  min_price: 1000,
  max_price: 1000,
  unit: '',
  status: 1,
  description: '',
};

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
  const [form] = Form.useForm();
  
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);

  useEffect(() => {
    if (category.status === "completed" || category.status === "rejected") {
      dispatch(getCategorys());
    }
    
    if (data) {
      form.setFieldsValue({
        ...data,
        category_id: data?.category?.id || 1,
      });
    }
  }, [form, data, category.status, dispatch]);

  return (
    <Form layout="vertical" className="px-2 py-4" initialValues={initialService} onFinish={onSubmit} form={form}>
      <Form.Item label="Hình ảnh" className="!mb-4" name="image" rules={[{ required: true, message: "Hãy thêm ảnh..." }]}>
        <CUploadImage setImageUrl={(value: string) => form.setFieldsValue({ image: value })} initialImageUrl={data?.image} />
      </Form.Item>
      <CRow gutter={[16, 16]}>
        <CCol span={14}>
          <Form.Item label="Tên dịch vụ" className="!mb-4" name="name" rules={[{ required: true, message: "Hãy nhập tên dịch vụ..." }]}>
            <CInput className="!h-[40px]" placeholder="Tên dịch vụ" />
          </Form.Item>
        </CCol>
        <CCol span={6}>
          <Form.Item label="Trạng thái" className="!mb-4" name="status" rules={[{ required: true, message: "Hãy chọn trạng thái..." }]}>
            <CSelect className="!h-[40px]" options={STATUS} />
          </Form.Item>
        </CCol>
        <CCol span={4}>
          <Form.Item label="Đơn vị" className="!mb-4" name="unit" rules={[{ required: true, message: "Hãy nhập đơn vị tính..." }]}>
            <CInput className="!h-[40px]" placeholder="Đơn vị tính" />
          </Form.Item>
        </CCol>
      </CRow>
      <CRow gutter={[16, 16]}>
        <CCol span={6}>
          <Form.Item label="Danh mục" className="!mb-4" name="category_id" rules={[{ required: true, message: "Hãy chọn danh mục..." }]}>
            <CSelect className="!h-[40px]" options={category.data?.map((c: ICategory) => ({ value: c.id, label: c.name }) || [])} />
          </Form.Item>
        </CCol>
        <CCol span={6}>
          <Form.Item label="Giá tối thiểu" className="!mb-4" name="min_price" rules={[{ required: true, message: "Hãy nhập giá tối thiểu..." }]}>
            <CInputNumber className="!h-[40px]" placeholder="Giá tối thiểu" />
          </Form.Item>
        </CCol>
        <CCol span={6}>
          <Form.Item label="Giá tối đa" className="!mb-4" name="max_price" rules={[{ required: true, message: "Hãy nhập giá tối đa..." }]}>
            <CInputNumber className="!h-[40px]" placeholder="Giá tối đa" />
          </Form.Item>
        </CCol>
        <CCol span={6}>
          <Form.Item label="Số lượng bán" className="!mb-4" name="quantity_sold">
            <CInputNumber className="!h-[40px]" placeholder="Số lượng bán" />
          </Form.Item>
        </CCol>
      </CRow>
      <Form.Item label="Mô tả" className="!mb-10" name="description" rules={[{ required: true, message: "Hãy nhập nội dung..." }]}>
        <CEditor initialDes={htmlToEditor(data?.description as string)} />
      </Form.Item>
      <CRow className="gap-4 justify-end">
        <CButton type="primary" icon={<FontAwesomeIcon icon={data ? faPenToSquare : faSave} />} htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
      </CRow>
    </Form>
  );
}
