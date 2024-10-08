"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faLanguage, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import FormComponent from "../components/FormComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IService } from "@/interfaces/IService";
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { useEffect, useState } from "react";
import { getServiceState } from "@/redux/reducers/serviceReducer";
import { serviceEditThunk } from "@/redux/thunks/serviceThunk";
import { serviceApi } from "@/api/serviceApi";
import CSpace from "@/custom_antd/CSpace";

export default function EditServiceComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const service = useAppSelector(getServiceState);

    const [data, setData] = useState<IService | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IService) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        dispatch(serviceEditThunk({ id: id as string, body: values }));
    }

    const getDataService = async (id: string) => {
        setLoading(true);
        const value = await serviceApi.findOne(id);
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
                <CSpace>
                    <CButton link={"/dich-vu/dich/" + id} type="default" icon={<FontAwesomeIcon icon={faLanguage} />}>Ngôn ngữ khác</CButton>
                    <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
                </CSpace>
            </CRow>
            <CSkeleton loading={service.edit === "wait" || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}