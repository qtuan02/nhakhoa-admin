"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faLanguage, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormComponent from "../components/FormComponent";
import { ICategory } from "@/interfaces/ICategory";
import { getCategoryState } from "@/redux/reducers/categoryReducer";
import { categoryEditThunk } from "@/redux/thunks/categoryThunk";
import { categoryApi } from "@/api/categoryApi";
import CSpace from "@/custom_antd/CSpace";

export default function EditCategoryComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const category = useAppSelector(getCategoryState);

    const [data, setData] = useState<ICategory | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: ICategory) => {
        dispatch(categoryEditThunk({ id: id as string, body: values}));
    }

    const getDataCategory = async (id: string) => {
        setLoading(true);
        const value = await categoryApi.findOne(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        if(category.edit === "success" || category.edit === "fail"){
            getDataCategory(id as string);
        }
    }, [id, category.edit]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Cập nhật danh mục</CTitle>
                <CSpace>
                    <CButton link={"/danh-muc/dich/" + id} type="default" icon={<FontAwesomeIcon icon={faLanguage} />}>Ngôn ngữ khác</CButton>
                    <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
                </CSpace>
            </CRow>
            <CSkeleton loading={category.edit === "wait" || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}