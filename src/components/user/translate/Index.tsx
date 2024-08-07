"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import CButton from "@/custom_antd/CButton";
import CSkeleton from "@/custom_antd/CSkeleton";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import FormTranslateComponent from "../components/FormTranslateComponent";
import { translateApi } from "@/api/translateApi";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";

export default function TranslateUserComponent() {
    const { id } = useParams();

    const [data, setData] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: IUser) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        setLoading(true);
        const res = await translateApi.translateDoctor(id as string, values);
        setLoading(false);
        if(res?.status === 200){
            TOAST_SUCCESS(res.message);
            getDataUser(id as string);
        }
    }

    const getDataUser = async (id: string) => {
        setLoading(true);
        const value = await translateApi.findOneDoctor(id);
        setLoading(false);
        setData(value);
    }
    
    useEffect(() => {
        getDataUser(id as string);
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