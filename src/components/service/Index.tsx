"use client";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import CSkeleton from "@/custom_antd/CSkeleton";
import TableComponent from "./components/TableComponent";
import { getServices } from "@/apis/serviceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getCategories } from "@/apis";

export default function ServiceComponent() {
    const service = useAppSelector((state) => state.service);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getCategories());

        if(service.status === "completed" || service.status === "rejected") {
            dispatch(getServices());
        }
    }, [dispatch, service.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Dịch vụ</CTitle>
                <CButton link="/dich-vu/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Thêm mới</CButton>
            </CRow>
            <CSkeleton loading={service.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}