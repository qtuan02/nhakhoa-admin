"use client";
import { getUsers } from "@/redux/slices/userSlice";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import TableComponent from "./components/TableComponent";
import { getUserState } from "@/redux/reducers/userReducer";

export default function UserComponent() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUserState);

    useEffect(() => {
        if(user.status === "completed" || user.status === "rejected") {
            dispatch(getUsers());
        }
    }, [dispatch, user.status]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Người dùng</CTitle>
                <CButton link="/nguoi-dung/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Thêm mới</CButton>
            </CRow>
            <CSkeleton loading={user.loading}>
                <div className="w-full h-[calc(100%-65px)] overflow-auto">
                    <TableComponent />
                </div>
            </CSkeleton>
        </>
    )
}