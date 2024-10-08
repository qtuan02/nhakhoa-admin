"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faCalendarCheck, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IHistory } from "@/interfaces/IHistory";
import FormCreateComponent from "../components/FormCreateComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Space } from "antd";
import { getHistoryState } from "@/redux/reducers/historyReducer";
import { historyCreateThunk } from "@/redux/thunks/historyThunk";
import { parseDayjsToString } from "@/utils/FunctionHelpers";

export default function CreateHistoryComponent() {
    const dispatch = useAppDispatch();
    const history = useAppSelector(getHistoryState);

    const handleSubmit = (values: IHistory) => {
        values.date = parseDayjsToString(values.date);
        values.services = history.services;
        dispatch(historyCreateThunk(values));
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo mới lịch khám</CTitle>
                <Space>
                    <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
                    <CButton link={"/lich-kham"} type="primary" icon={<FontAwesomeIcon icon={faCalendarCheck} />}>Lịch khám</CButton>
                </Space>
            </CRow>
            <CSkeleton loading={history.loading}>
                <FormCreateComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}