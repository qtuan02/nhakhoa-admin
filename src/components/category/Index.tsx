"use client";
import CRow from "@/custom_antd/CRow";
import TableComponent from "./components/TableComponent";
import CTitle from "@/custom_antd/CTitle";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getCategories } from "@/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";

export default function CategoryComponent() {
    const category = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(category.status === "completed" || category.status === "rejected") {
            dispatch(getCategories());
        }
    }, [dispatch, category.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Danh mục</CTitle>
                <CButton link="/danh-muc/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Thêm mới</CButton>
            </CRow>
            <CSkeleton loading={category.loading}>
                <div className="w-full h-[calc(100%-65x)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}