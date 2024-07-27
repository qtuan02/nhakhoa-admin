"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TableComponent from "./components/TableComponent";
import { useEffect } from "react";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import CButton from "@/custom_antd/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CSkeleton from "@/custom_antd/CSkeleton";
import { getCustomerState } from "@/redux/reducers/customerReducer";
import { customersThunk } from "@/redux/thunks/customerThunk";

export default function CustomerComponent() {
    const dispatch = useAppDispatch();
    const customer = useAppSelector(getCustomerState);

    useEffect(() => {
        if(customer.status === "completed" || customer.status === "rejected") {
            dispatch(customersThunk());
        }
    }, [dispatch, customer.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Khách hàng</CTitle>
                <CButton link="/khach-hang/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Thêm mới</CButton>
            </CRow> 
            <CSkeleton loading={customer.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}