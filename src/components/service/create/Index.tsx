"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import FormComponent from "../components/FormComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import CSkeleton from "@/custom_antd/CSkeleton";
import { IService } from "@/interfaces/IService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { getServiceState } from "@/redux/reducers/serviceReducer";
import { serviceCreateThunk } from "@/redux/thunks/serviceThunk";

export default function CreateServiceComponent() {
    const dispatch = useAppDispatch();
    const service = useAppSelector(getServiceState);

    const handleSubmit = (values: IService) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        dispatch(serviceCreateThunk(values));
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo dịch vụ</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={service.loading}>
                <FormComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}