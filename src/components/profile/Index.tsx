"use client";
import { appConfig } from "@/config/AppConfig";
import CCol from "@/custom_antd/CCol";
import CTitle from "@/custom_antd/CTitle";
import { useAppSelector } from "@/redux/hooks";
import { getAuthState } from "@/redux/reducers/authReducer";
import { formatDate } from "@/utils/FunctionHelpers";
import { Avatar, Flex } from "antd";

export default function ProfileComponent() {
    const auth = useAppSelector(getAuthState);
    
    return (
        <div className="mx-10">
            <CTitle className="text-center mt-5">Thông tin cá nhân</CTitle>
            <Flex gap={100} justify="center" className="border py-16 shadow-lg rounded-3xl">
                <CCol>
                    <Avatar src={auth.profile?.avatar} alt="Hình đại diện..." shape="circle" style={{ width: 300, height: 300, border: '1px solid #f3f3f3' }} />
                </CCol>
                <CCol>
                    <CTitle level={2} className="mt-5 !text-[#313b79]">{auth.profile?.role === appConfig.R_1 ? "Quản trị viên" : auth.profile?.role === appConfig.R_2 ? "Nhân viên y tế" : "Nha sĩ"}</CTitle>
                    <p className="ts-20 mt-2">Họ và tên: <span className="font-bold">{auth.profile?.name}</span></p>
                    <p className="ts-14 mt-2">Giới tính: <span className="ts-16">{auth.profile?.gender === 1 ? "Nam" : "Nữ"}</span></p>
                    <p className="ts-14 mt-2">Số điện thoại: <span className="ts-16">{auth.profile?.phone_number}</span></p>
                    <p className="ts-14 mt-2">Ngày sinh: <span className="ts-16">{formatDate(auth.profile?.birthday)}</span></p>
                    <p className="ts-14 mt-2">Email: <span className="ts-16">{auth.profile?.email}</span></p>
                    <p className="ts-14 mt-2">Địa chỉ: <span className="ts-16">{auth.profile?.address}</span></p>
                </CCol>
            </Flex>
        </div>
    );
}