"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import TableComponent from "./components/TableComponent";
import { getAppointmentState } from "@/redux/reducers/appointmentReducer";
import { appointmentsThunk } from "@/redux/thunks/appointmentThunk";
import CSpace from "@/custom_antd/CSpace";

export default function AppointmentComponent() {
    const dispatch = useAppDispatch();
    const appointment = useAppSelector(getAppointmentState);

    useEffect(() => {
        if(appointment.status === "completed" || appointment.status === "rejected") {
            dispatch(appointmentsThunk());
        } 
    }, [dispatch, appointment.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Danh sách lịch hẹn</CTitle>
                <CSpace>
                    <CButton onClick={() => dispatch(appointmentsThunk())} type="default" icon={<FontAwesomeIcon icon={faRotateRight} />}>Tải lại</CButton>
                    <CButton link="/lich-hen/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Đặt lịch hẹn</CButton>
                </CSpace>
            </CRow>
            <CSkeleton loading={appointment.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}