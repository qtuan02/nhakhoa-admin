import { getDoctors, getTimes } from "@/apis";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import { ISchedule } from "@/interfaces/ISchedule";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { parseDayjsToString } from "@/utils/FunctionHelpers";
import { DatePicker, Form } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

interface FormComponentProps {
    onSubmit: (values: ISchedule) => void;
}

const initialSchedule: ISchedule = {
    doctor_id: undefined,
    date: ''
}

export default function FormCreateComponent({ onSubmit }: FormComponentProps) {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState<boolean>(true);

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const appointment = useAppSelector((state) => state.appointment);


    const handleCreateDate = (date: string) => {
        if(date){
            console.log(parseDayjsToString(date));
        }else{
            setDisabled(!disabled);
        }
    }

    useEffect(() => {
        if (user.statusDoctors === 'completed' || user.statusDoctors === 'rejected') {
            dispatch(getDoctors());
        }

        if (appointment.statusTime === 'completed' || appointment.statusTime === 'rejected') {
            dispatch(getTimes());
        }

        if(id){
            form.setFieldValue('doctor_id', id);
            setDisabled(false);
        }
    }, [user.statusDoctors, dispatch, id, form, appointment.statusTime]);

    return (
        <Form layout="vertical" className="px-2 py-4" initialValues={initialSchedule} onFinish={onSubmit} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol span={12}>
                    <Form.Item label="Chọn nha sĩ" className="!mb-4" name="doctor_id" rules={[{ required: true, message: "Hãy chọn nha sĩ..." }]}>
                        <CSelect
                            disabled={!disabled}
                            onChange={() => setDisabled(false)}
                            className="!h-[40px]"
                            showSearch
                            placeholder="Chọn nha sĩ..."
                            options={user.doctors.map(u => ({ value: u.id, label: u.id + ' - ' + u.name + ' - ' + u.phone_number }))}
                            filterOption={(input, option) =>
                                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    <Form.Item label="Chọn ngày" className="!mb-4" name="date">
                        <DatePicker onChange={handleCreateDate} disabled={disabled} className="h-10 w-full" format='DD/MM/YYYY' placeholder="Chọn ngày..." />
                    </Form.Item>
                </CCol>
            </CRow>
            <br />
            <CRow className="gap-4 justify-end">
                <CButton type="primary" htmlType="submit">Lưu</CButton>
            </CRow>
        </Form>
    );
}