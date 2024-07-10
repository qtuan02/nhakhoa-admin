import { getCustomers, getUsers } from "@/apis";
import { STATUS_HISTORY } from "@/commons/Option";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { IHistory } from "@/interfaces/IHistory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDoctors } from "@/redux/reducers/userReducer";
import { Form, Input } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface FormComponentProps {
    onSubmit: (values: IHistory) => void;
    data?: IHistory;
}

const initialHistory: IHistory = {
    customer_id: undefined,
    doctor_id: undefined,
    note: ''
}

export default function FormCreateComponent({ onSubmit, data }: FormComponentProps) {
    const { id } = useParams();
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const customer = useAppSelector((state) => state.customer);

    useEffect(() => {
        if(customer.status === 'completed' || customer.status === 'rejected') {
            dispatch(getCustomers());
        }

        if(user.status === 'completed' || user.status === 'rejected') {
            dispatch(getUsers());
        }

        if(user.doctors.length === 0) {
            dispatch(setDoctors());
        }

        if(id){
            form.setFieldValue("customer_id", id);
        }
        
    }, [customer.status, dispatch, form, id, user.doctors.length, user.status]);
    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialHistory} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol span={12}>
                    <Form.Item label="Khách hàng" className="!mb-4" name="customer_id" rules={[{ required: true, message: "Hãy chọn khách hàng..." }]}>
                        <CSelect
                            className="!h-[40px]"
                            showSearch
                            placeholder="Chọn khách hàng..."
                            options={customer.data.map(c => ({ value: c.id, label: c.id+' - '+c.name+' - '+c.phone_number }))}
                            filterOption={(input, option) =>
                                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    <Form.Item label="Nha sĩ" className="!mb-4" name="doctor_id" rules={[{ required: true, message: "Hãy chọn nha sĩ..." }]}>
                        <CSelect
                            className="!h-[40px]"
                            showSearch
                            placeholder="Chọn nha sĩ..."
                            options={user.data.map(c => ({ value: c.id, label: c.id+' - '+c.name+' - '+c.phone_number }))}
                            filterOption={(input, option) =>
                                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </CCol>
            </CRow>
            
            <Form.Item label="Ghi chú:" name="note">
                <Input.TextArea
                    showCount
                    maxLength={1000}
                    placeholder="Nhập nội dung..."
                    className="ts-16"
                    style={{ height: 200, resize: 'none' }}
                />
            </Form.Item>
            <br />
            <CRow className="gap-4 justify-end">
                <CButton type="primary" htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}