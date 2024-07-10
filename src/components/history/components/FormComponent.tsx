import { getCustomers, getUsers } from "@/apis";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CInput from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { IHistory } from "@/interfaces/IHistory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDoctors } from "@/redux/reducers/userReducer";
import { Form } from "antd";
import { useEffect } from "react";

interface FormComponentProps {
    onSubmit: (values: IHistory) => void;
    data?: IHistory;
}

const initialHistory: IHistory = {

}

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
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
    }, [customer.status, dispatch, user.doctors.length, user.status]);

    return (
        <Form layout="vertical" className="px-2 py-4" onFinish={onSubmit} initialValues={initialHistory} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol span={12}>
                    <Form.Item label="Khách hàng" className="!mb-4" name="customer_id" rules={[{ required: true, message: "Hãy chọn khách hàng..." }]}>
                        <CSelect
                            className="!h-[40px]"
                            showSearch
                            placeholder="Chọn khách hàng..."
                            filterOption={(input, option) =>
                                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Jack' },
                                { value: '3', label: 'Lucy' },
                                { value: '4', label: 'Tom' },
                            ]}
                        />
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    <Form.Item label="Nha sĩ" className="!mb-4" name="doctor_id" rules={[{ required: true, message: "Hãy chọn nha sĩ..." }]}>
                        <CSelect
                            className="!h-[40px]"
                            showSearch
                            placeholder="Chọn nha sĩ..."
                            filterOption={(input, option) =>
                                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Jack' },
                                { value: '3', label: 'Lucy' },
                                { value: '4', label: 'Tom' },
                            ]}
                        />
                    </Form.Item>
                </CCol>
            </CRow>
            <CRow className="gap-4 justify-end">
                <CButton type="primary" htmlType="submit">{data ? "Cập nhật" : "Lưu"}</CButton>
            </CRow>
        </Form>
    );
}