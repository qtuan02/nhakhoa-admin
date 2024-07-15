"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import { IAppointment } from "@/interfaces/IAppointment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import FormComponent from "../components/FormComponent";
import { useEffect, useState } from "react";
import { editAppointment, getAppointment } from "@/apis";
import CSkeleton from "@/custom_antd/CSkeleton";
import { parseDayjsToString } from "@/utils/FunctionHelpers";

export default function EditAppointmentComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const appointment = useAppSelector((state) => state.appointment);

    const [data, setData] = useState<IAppointment | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IAppointment) => {
        values.date = parseDayjsToString(values.date);
        values.services = appointment.services;     
        dispatch(editAppointment({ id: id as string, data: values }));
    }

    const getDataAppointment = async (id: string) => {
        setLoading(true);
        const value = await getAppointment(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        if(appointment.edit === 'success' || appointment.edit === 'fail'){
            getDataAppointment(id as string);
        }
    }, [appointment.edit, dispatch, id]);
    
    return (
        <>
            <CRow className="justify-between">
                <CTitle>Cập nhật lịch hẹn</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={appointment.edit === 'wait' || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}