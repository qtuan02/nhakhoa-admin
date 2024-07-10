"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IHistory } from "@/interfaces/IHistory";
import FormCreateComponent from "../components/FormCreateComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createHistory } from "@/apis";

export default function CreateHistoryComponent() {
    const dispatch = useAppDispatch();
    const history = useAppSelector((state) => state.history);

    const handleSubmit = (values: IHistory) => {
        dispatch(createHistory(values));
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo mới lịch khám</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={history.loading}>
                <FormCreateComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}