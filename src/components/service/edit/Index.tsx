"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import FormComponent from "../components/FormComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IService } from "@/interfaces/IService";
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { useEffect, useState } from "react";
import { editService, getService } from "@/redux/slices/serviceSlice";
import { getServiceState } from "@/redux/reducers/serviceReducer";

export default function EditServiceComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const service = useAppSelector(getServiceState);

    const [data, setData] = useState<IService | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IService) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        dispatch(editService({ id: id as string, data: values }));
    }

    const getDataService = async (id: string) => {
        setLoading(true);
        const value = await getService(id);
        setLoading(false);
        setData(value);
    }
    
    useEffect(() => {
        if(service.edit === "success" || service.edit === "fail"){
            getDataService(id as string);
        }
    }, [dispatch, id, service.edit]);


    return (
        <>
            <CRow className="justify-between">
                <CTitle>Cập nhật dịch vụ</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={service.edit === "wait" || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}