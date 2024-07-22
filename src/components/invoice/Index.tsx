"use client";
import { getInvoices } from "@/apis";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import TableComponent from "./components/TableComponent";
import CButton from "@/custom_antd/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function InvoiceComponent() {
    const invoice = useAppSelector((state) => state.invoice);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(invoice.status === "completed" || invoice.status === "rejected") {
            dispatch(getInvoices());
        }
    }, [dispatch, invoice.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Danh sách hóa đơn</CTitle>
                <CButton onClick={() => dispatch(getInvoices())} type="primary" icon={<FontAwesomeIcon icon={faRotateRight} />}>Tải lại</CButton>
            </CRow>
            <CSkeleton loading={invoice.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}