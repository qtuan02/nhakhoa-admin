"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getAppointments } from "@/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import TableComponent from "./components/TableComponent";

export default function AppointmentComponent() {
    const appointment = useAppSelector((state) => state.appointment);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(appointment.status === "completed" || appointment.status === "rejected") {
            dispatch(getAppointments());
        } 
    }, [dispatch, appointment.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Danh sách lịch hẹn</CTitle>
                <CButton link="/lich-hen/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Đặt lịch hẹn</CButton>
            </CRow>
            <CSkeleton loading={appointment.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}