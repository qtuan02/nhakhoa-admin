"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { IService } from "@/interfaces/IService";
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { useEffect, useState } from "react";
import FormTranslateComponent from "../components/FormTranslateComponent";
import { translateApi } from "@/api/translateApi";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";

export default function TranslateServiceComponent() {
    const { id } = useParams();

    const [data, setData] = useState<IService | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: IService) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        setLoading(true);
        const res = await translateApi.translateService(id as string, values);
        setLoading(false);
        if(res?.status === 200){
            TOAST_SUCCESS(res.message);
            getDataService(id as string)
        }
    }

    const getDataService = async (id: string) => {
        setLoading(true);
        const value = await translateApi.findOneService(id);
        setLoading(false);
        setData(value);
    }
    
    useEffect(() => {
        getDataService(id as string);
    }, [id]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Ngôn ngữ khác</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={loading}>
                <FormTranslateComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}