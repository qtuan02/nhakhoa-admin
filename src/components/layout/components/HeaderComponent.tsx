"use client";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CDropDown from "@/custom_antd/CDropdown";
import CRow from "@/custom_antd/CRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faAddressCard, faBars, faBell, faLock, faSignOut, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Flex, Layout, MenuProps } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { logoutThunk } from "@/redux/thunks/authThunk";
import usePusher from "@/hooks/usePusher";
import { getAuthState } from "@/redux/reducers/authReducer";
import DrawerComponent from "./DrawerComponent";
import { setNotification } from "@/redux/reducers/notificationReducer";
const { Header } = Layout;

interface IHeaderComponentProps {
    sider: boolean,
    toggle: () => void,
}

export default function HeaderComponent({ sider, toggle }: IHeaderComponentProps) {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(getAuthState);

    const [ modal, setModal ] = useState<boolean>(false);
    const [ drawer, setDrawer ] = useState<boolean>(false);

    const countNotice = usePusher();

    const handleToggleModal = () => {
        setModal(!modal);
    }

    const handleToggleDrawer = () => {
        setDrawer(!drawer);
        dispatch(setNotification(0));
    }

    const items: MenuProps["items"] = [
        {
            key: "info",
            type: "group",
            label: <span>
                <p className="text-[#000]">{auth?.currentUser?.name || ""}</p>
                <p className="ts-12">{auth?.currentUser?.email || ""}</p>
            </span>
        },
        {
            type: "divider",
        },
        {
            key: "profile",
            label: <Link href="/thong-tin" >Thông tin</Link>,
            icon: <FontAwesomeIcon icon={faAddressCard} />
        },
        {
            key: "change-password",
            label: <Link href="#" onClick={() => handleToggleModal()}>Đổi mật khẩu</Link>,
            icon: <FontAwesomeIcon icon={faLock} />
        },
        {
            type: "divider",
        },
    ];

    return (
        <Header className="!bg-[#fff] mx-4 my-2 rounded-xl !px-6">
            <CRow className="justify-between">
                <CCol>
                    <CRow gutter={[16, 16]}>
                        <CCol>
                            <CButton className="!h-10 !w-10 !border-none !bg-[#f0f0f0]" onClick={() => toggle()}>
                                {sider ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol>
                    <Flex gap={16}>
                        <CCol>
                            <Badge count={countNotice} size="small" color="#f50">
                                <CButton onClick={() => handleToggleDrawer()} size="large" type="default" shape="circle" icon={<FontAwesomeIcon icon={faBell} />}></CButton>
                            </Badge>
                            <DrawerComponent drawer={drawer} toggle={handleToggleDrawer} />
                        </CCol>
                        <CCol>
                            <CDropDown menu={{ items }} trigger={["click"]} placement="bottomRight"
                                dropdownRender={(menu) => (
                                    <div className="bg-[#ffffff] shadow-lg px-2 py-2 rounded-lg border">
                                        {React.cloneElement(menu as React.ReactElement, { style: { boxShadow: "none" } })}
                                        <Flex justify="center">
                                            <CButton icon={<FontAwesomeIcon icon={faSignOut} />} type="default" danger
                                                onClick={() => dispatch(logoutThunk())}>Đăng xuất</CButton>
                                        </Flex>
                                    </div>
                                )}>
                                <Avatar className="hover:bg-[#d9d9d9] hover:opacity-90 cursor-pointer shadow-sm" style={{ border: "1px solid #d9d9d9"}} size="large" src={auth?.currentUser?.avatar || ""} alt="Ảnh đại diện..." />
                            </CDropDown>
                            <ModalComponent modal={modal} toggle={handleToggleModal} />
                        </CCol>
                    </Flex>
                </CCol>
            </CRow>
        </Header>
    );
}