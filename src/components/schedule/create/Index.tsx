"use client"
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateScheduleComponent() {
    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo lịch làm việc</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
        </>
    );
}