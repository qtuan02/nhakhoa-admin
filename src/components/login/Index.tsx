"use client";
import CButton from "@/custom_antd/CButton";
import CCheckBox from "@/custom_antd/CCheckBox";
import { CForm, CFormItem } from "@/custom_antd/CForm";
import { CInput } from "@/custom_antd/CInput";
import CRow from "@/custom_antd/CRow";

export default function Login(){
    return (
        <CRow className="items-center h-screen">
            <CForm className="w-[500px] !mx-auto shadow-lg !p-14 border-t-4 border-green-400 rounded-lg">
                <CFormItem>
                    <CInput placeholder="Tài khoản..." className="h-10"/>
                </CFormItem>
                <CFormItem className="!mb-2">
                    <CInput type="password" placeholder="Mật khẩu..." className="h-10"/>
                </CFormItem>
                <CFormItem className="text-end !mb-2">
                    <CCheckBox>Nhớ mật khẩu</CCheckBox>
                </CFormItem>
                <CFormItem className="!mb-2">
                    <CButton type="primary" htmlType="submit" className="w-full !py-5 rounded !text-lg !font-bold !bg-green-400">Đăng nhập</CButton>
                </CFormItem>
            </CForm>
        </CRow>
    );
}