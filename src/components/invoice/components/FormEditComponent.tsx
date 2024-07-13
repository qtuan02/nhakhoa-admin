import { METHOD_PAYMENT_INVOICE, STATUS_INVOICE } from "@/commons/Option";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import CTitle from "@/custom_antd/CTitle";
import { IInvoice } from "@/interfaces/IInvoice";
import { Form } from "antd";

interface FormComponentProps {
    onSubmit: (values: IInvoice) => void;
    data?: IInvoice;
}

const initialInvoice: IInvoice = {
    method_payment: 0,
    status: 0,
}

export default function FormEditComponent({ onSubmit, data }: FormComponentProps) {
    const [form] = Form.useForm();

    return (
        <>
            <CTitle level={3}>Mã hóa đơn {data?.id}</CTitle>
            {data && data.status === 0 ? 
                <Form layout="vertical" onFinish={onSubmit} initialValues={initialInvoice} form={form}>
                    <Form.Item label="Trạng thái:" name="status" rules={[{ required: true, message: "Hãy chọn trạng thái..." }]}>
                        <CSelect className="!h-[40px]" options={STATUS_INVOICE} />
                    </Form.Item>
                    <Form.Item label="Phương thức thanh toán:" name="method_payment" rules={[{ required: true, message: "Hãy chọn phương thức thanh toán..." }]}>
                        <CSelect className="!h-[40px]" options={METHOD_PAYMENT_INVOICE} />
                    </Form.Item>
                    <br />
                    <CRow className="gap-4 justify-end">
                        <CButton type="primary" htmlType="submit">Xác nhận</CButton>
                    </CRow>
                </Form>
                : <CTitle level={5} className="!text-green-500">Hóa đơn đã thanh toán!</CTitle>
            }
        </>
    );
}