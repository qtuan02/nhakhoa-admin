"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import FormComponent from "../components/FormComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import { ICategory } from "@/interfaces/ICategory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createCategory } from "@/redux/slices/categorySlice";
import CSkeleton from "@/custom_antd/CSkeleton";
import { getCategoryState } from "@/redux/reducers/categoryReducer";

export default function CreateCategoryComponent() {
    const dispatch = useAppDispatch();
    const category = useAppSelector(getCategoryState);

    const handleSubmit = (values: ICategory) => {
        dispatch(createCategory(values));
    }
    
    return (
        <>
            <CRow className="justify-between">
                <CTitle>Tạo danh mục</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={category.loading}>
                <FormComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}