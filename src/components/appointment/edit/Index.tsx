"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import { IAppointment } from "@/interfaces/IAppointment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import FormComponent from "../components/FormComponent";
import { useEffect, useState } from "react";
import CSkeleton from "@/custom_antd/CSkeleton";
import { parseDayjsToString } from "@/utils/FunctionHelpers";
import { getAppointmentState } from "@/redux/reducers/appointmentReducer";
import { appointmentApi } from "@/api/appointmentApi";
import { appointmentEditThunk } from "@/redux/thunks/appointmentThunk";
import { getHistoryState, setAppointment, setServices } from "@/redux/reducers/historyReducer";
import { Space } from "antd";

export default function EditAppointmentComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const appointment = useAppSelector(getAppointmentState);

    const router = useRouter();

    const [data, setData] = useState<IAppointment | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IAppointment) => {
        values.date = parseDayjsToString(values.date);
        values.services = appointment.services;
        dispatch(appointmentEditThunk({ id: id as string, body: values }));
        if(values.status === 2) {
            dispatch(setAppointment(values));
            dispatch(setServices(values.services));
            router.push("/lich-kham/them");
        } 
    }

    const getDataAppointment = async (id: string) => {
        setLoading(true);
        const value = await appointmentApi.findOne(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        if(appointment.edit === "success" || appointment.edit === "fail"){
            getDataAppointment(id as string);
        }
    }, [appointment.edit, dispatch, id]);
    
    return (
        <>
            <CRow className="justify-between">
                <CTitle>Cập nhật lịch hẹn</CTitle>
                <Space>
                    <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
                    <CButton link={"/lich-hen"} type="primary" icon={<FontAwesomeIcon icon={faCalendar} />}>Lịch hẹn</CButton>
                </Space>
            </CRow>
            <CSkeleton loading={appointment.edit === "wait" || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}