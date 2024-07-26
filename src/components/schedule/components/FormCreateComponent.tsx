import { IScheduleAction, IScheduleCreate } from "@/interfaces/ISchedule";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import { CSelect } from "@/custom_antd/CSelect";
import CSelectTag from "@/custom_antd/CSelectTag";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatDate, parseDayjsToString } from "@/utils/FunctionHelpers";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";
import { faMinus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, DatePicker, Form } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoctors } from "@/redux/slices/userSlice";
import { getTimes } from "@/redux/slices/appointmentSlice";

interface FormComponentProps {
    onSubmit: (values: IScheduleAction) => void;
}

const initialSchedule: IScheduleAction = {
    doctor_id: undefined,
    schedule: []
}

export default function FormCreateComponent({ onSubmit }: FormComponentProps) {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const appointment = useAppSelector((state) => state.appointment);

    const handleDisabledSunday = (current: any) => {
        return current && current.day() === 0;
    };

    const handleCreateDate = (date: string) => {
        if (date) {
            const formattedDate = parseDayjsToString(date);
            if (!selectedDates.includes(formattedDate)) {
                setSelectedDates([...selectedDates, formattedDate]);
                form.setFieldsValue({
                    schedule: [...form.getFieldValue("schedule"), { date: formattedDate, time: [] }]
                });
            }
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const handleDeleteDate = (date: string) => {
        setSelectedDates(selectedDates.filter(d => d !== date));
        form.setFieldsValue({
            schedule: form.getFieldValue("schedule").filter((d: any) => d.date !== date)
        });
        TOAST_SUCCESS(`Đã xóa ngày ${formatDate(date)}!`)
    }

    const handleSelectTime = (date: string, times: number[]) => {
        const schedule = form.getFieldValue("schedule").map((item: IScheduleCreate) => {
            if (item.date === date) {
                return { ...item, time: times };
            }
            return item;
        });
        form.setFieldsValue({ schedule });
    }

    useEffect(() => {
        if (user.statusDoctors === "completed" || user.statusDoctors === "rejected") {
            dispatch(getDoctors());
        }

        if (appointment.statusTime === "completed" || appointment.statusTime === "rejected") {
            dispatch(getTimes());
        }

        if (id) {
            form.setFieldValue("doctor_id", id);
            setDisabled(false);
        }
    }, [user.statusDoctors, dispatch, id, form, appointment.statusTime]);

    return (
        <Form layout="vertical" className="px-2 py-4" initialValues={initialSchedule} onFinish={onSubmit} form={form}>
            <CRow gutter={[16, 16]}>
                <CCol span={12}>
                    <Form.Item label="Chọn nha sĩ" className="!mb-4" name="doctor_id" rules={[{ required: true, message: "Hãy chọn nha sĩ..." }]}>
                        <CSelect
                            loading={user.loadingDoctors}
                            disabled={!disabled}
                            onChange={() => setDisabled(false)}
                            className="!h-[40px]"
                            placeholder="Chọn nha sĩ..."
                            options={user?.doctors?.map(u => ({ value: u.id, label: u.id + " - " + u.name + " - " + u.phone_number })) || []}
                            filterOption={(input, option) =>
                                (option?.label as string ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </CCol>
                <CCol span={12}>
                    <Form.Item label="Chọn ngày" className="!mb-4">
                        <DatePicker
                            disabledDate={handleDisabledSunday}
                            disabled={disabled}
                            className="h-10 w-full"
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày..."
                            allowClear={false}
                            onChange={handleCreateDate}
                        />
                    </Form.Item>
                </CCol>
            </CRow>
            <CRow gutter={[16, 16]}>
                <Form.List name="schedule">
                    {(fields) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <CCol key={key} span={8}>
                                    <Form.Item {...restField} name={[name, "date"]}>
                                        <Card className="shadow-md cursor-pointer hover:shadow-lg"
                                            title={`Ngày ${formatDate(selectedDates[key])}`}
                                            extra={<CButton type="primary" danger size="middle"
                                                shape="circle" tooltip="Xóa" icon={<FontAwesomeIcon icon={faMinus} />}
                                                onClick={() => handleDeleteDate(selectedDates[key])} />}>
                                            <CSelectTag data={appointment.times} size="middle"
                                                onChange={(times) => handleSelectTime(form.getFieldValue("schedule")[key]?.date, times)} />
                                        </Card>
                                    </Form.Item>
                                </CCol>
                            ))}
                        </>
                    )}
                </Form.List>
            </CRow>
            <br />
            <CRow className="gap-4 justify-end">
                <CButton type="primary" icon={<FontAwesomeIcon icon={faSave} />} htmlType="submit">Lưu</CButton>
            </CRow>
        </Form>
    );
}
