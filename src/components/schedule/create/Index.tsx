"use client"
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormCreateComponent from "../components/FormCreateComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IScheduleAction } from "@/interfaces/ISchedule";
import { createSchedule } from "@/apis";

export default function CreateScheduleComponent() {
    const dispatch = useAppDispatch();
    const schedule = useAppSelector((state) => state.schedule);

    const handleSubmit = (values: IScheduleAction) => {
        dispatch(createSchedule(values));
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo lịch làm việc</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={schedule.loading}>
                <FormCreateComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}