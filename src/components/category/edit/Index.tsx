"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { editCategory, getCategory } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormComponent from "../components/FormComponent";
import { ICategory } from "@/interfaces/ICategory";

export default function EditCategoryComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const category = useAppSelector((state) => state.category);

    const [data, setData] = useState<ICategory | undefined>(undefined);

    const handleSubmit = (values: ICategory) => {
        dispatch(editCategory({ id: id as string, data: values}));
    }

    const getDataCategory = async (id: string) => {
        const value = await getCategory(id);
        setData(value);
    }

    useEffect(() => {
        if(category.edit === 'success' || category.edit === 'fail'){
            getDataCategory(id as string);
        }
    }, [id, category.edit]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Cập nhật danh mục</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={category.edit === 'wait'}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}