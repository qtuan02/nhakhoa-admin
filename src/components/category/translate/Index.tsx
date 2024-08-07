"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/ICategory";
import { translateApi } from "@/api/translateApi";
import FormTranslateComponent from "../components/FormTranslateComponent";
import { TOAST_SUCCESS } from "@/utils/FunctionUiHelpers";

export default function TranslateCategoryComponent() {
    const { id } = useParams();

    const [data, setData] = useState<ICategory | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: ICategory) => {
        setLoading(true);
        const res = await translateApi.translateCategory(id as string, values);
        setLoading(false);
        if(res?.status === 200) {
            TOAST_SUCCESS(res.message);
            getDataCategory(id as string);
        }
    }

    const getDataCategory = async (id: string) => {
        setLoading(true);
        const value = await translateApi.findOneCategory(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        getDataCategory(id as string);
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