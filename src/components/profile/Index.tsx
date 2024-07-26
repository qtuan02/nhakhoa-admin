"use client";
import { appConfig } from "@/config/AppConfig";
import CCol from "@/custom_antd/CCol";
import CTitle from "@/custom_antd/CTitle";
import { useAppSelector } from "@/redux/hooks";
import { getAuthenticateState } from "@/redux/reducers/authenticateReducer";
import { formatDate } from "@/utils/FunctionHelpers";
import { Avatar, Flex } from "antd";

export default function ProfileComponent() {
    const { currentUser } = useAppSelector(getAuthenticateState);
    
    return (
        <div className="mx-10">
            <CTitle className="text-center mt-5">Thông tin cá nhân</CTitle>
            <Flex gap={100} justify="center" className="border py-16 shadow-lg rounded-3xl">
                <CCol>
                    <Avatar src={currentUser?.avatar} alt="Hình đại diện..." shape="circle" style={{ width: 300, height: 300, border: "1px solid #f3f3f3" }} />
                </CCol>
                <CCol>
                    <CTitle level={2} className="mt-5 !text-[#313b79]">{currentUser?.role === appConfig.R_1 ? "Quản trị viên" : currentUser?.role === appConfig.R_2 ? "Nhân viên y tế" : "Nha sĩ"}</CTitle>
                    <p className="ts-20 mt-2">Họ và tên: <span className="font-bold">{currentUser?.name}</span></p>
                    <p className="ts-14 mt-2">Giới tính: <span className="ts-16">{currentUser?.gender === 1 ? "Nam" : "Nữ"}</span></p>
                    <p className="ts-14 mt-2">Số điện thoại: <span className="ts-16">{currentUser?.phone_number}</span></p>
                    <p className="ts-14 mt-2">Ngày sinh: <span className="ts-16">{formatDate(currentUser?.birthday)}</span></p>
                    <p className="ts-14 mt-2">Email: <span className="ts-16">{currentUser?.email}</span></p>
                    <p className="ts-14 mt-2">Địa chỉ: <span className="ts-16">{currentUser?.address}</span></p>
                </CCol>
            </Flex>
        </div>
    );
}