"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from "../components/FormComponent";
import { IHistory } from "@/interfaces/IHistory";

export default function CreateHistoryComponent() {
    const handleSubmit = (values: IHistory) => {
        console.log(values);
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo mới lịch khám</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={false}>
                <FormComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}