"use client";
import CRow from "@/custom_antd/CRow";
import TableComponent from "./components/TableComponent";
import CTitle from "@/custom_antd/CTitle";
import CButton from "@/custom_antd/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getHistories } from "@/redux/slices/historySlice";
import CSkeleton from "@/custom_antd/CSkeleton";
import { getHistoryState } from "@/redux/reducers/historyReducer";

export default function HistoryComponent(){
    const dispatch = useAppDispatch();
    const history = useAppSelector(getHistoryState);

    useEffect(() => {
        if(history.status === "completed" || history.status === "rejected") {
            dispatch(getHistories());
        }
    }, [dispatch, history.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Danh sách lịch khám</CTitle>
                <CButton link="/lich-kham/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Tạo lịch khám</CButton>
            </CRow>
            <CSkeleton loading={history.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    );
}