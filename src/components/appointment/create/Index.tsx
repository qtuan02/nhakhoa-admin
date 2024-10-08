"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import FormComponent from "../components/FormComponent";
import { IAppointment } from "@/interfaces/IAppointment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CSkeleton from "@/custom_antd/CSkeleton";
import { clearService, getAppointmentState } from "@/redux/reducers/appointmentReducer";
import { useEffect } from "react";
import { parseDayjsToString } from "@/utils/FunctionHelpers";
import { appointmentCreateThunk } from "@/redux/thunks/appointmentThunk";

export default function CreateAppointmentComponent() {
    const dispatch = useAppDispatch();
    const appointment = useAppSelector(getAppointmentState);

    const handleSubmit = (values: IAppointment) => {
        values.date = parseDayjsToString(values.date);
        values.services = appointment.services;
        dispatch(appointmentCreateThunk(values));
    }

    useEffect(() => {
        dispatch(clearService());
    }, [dispatch]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Đặt lịch hẹn</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={appointment.loading}>
                <FormComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}