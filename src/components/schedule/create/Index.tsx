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
import { getScheduleState } from "@/redux/reducers/scheduleReducer";
import { scheduleCreateThunk } from "@/redux/thunks/scheduleThunk";

export default function CreateScheduleComponent() {
    const dispatch = useAppDispatch();
    const schedule = useAppSelector(getScheduleState);

    const handleSubmit = (values: IScheduleAction) => {
        dispatch(scheduleCreateThunk(values));
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