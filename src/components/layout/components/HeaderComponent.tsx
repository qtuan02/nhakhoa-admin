import CButton from '@/custom_antd/CButton';
import CCol from '@/custom_antd/CCol';
import CDropDown from '@/custom_antd/CDropdown';
import CRow from '@/custom_antd/CRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthState, logout, toggleModal } from '@/redux/reducers/authReducer';
import { getSiderState, toggleSider } from '@/redux/reducers/siderReducer';
import { RootState } from '@/redux/store';
import { faAddressCard, faBars, faBell, faLock, faSignOut, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Flex, Layout, MenuProps } from 'antd';
import Link from 'next/link';
import React from 'react';
import ModalComponent from './ModalComponent';
const { Header } = Layout;

export default function HeaderComponent() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(getAuthState);
    const sider = useAppSelector(getSiderState);

    const items: MenuProps['items'] = [
        {
            key: 'info',
            type: 'group',
            label: <span>
                <p className='text-[#000]'>{auth.profile?.name}</p>
                <p className='ts-12'>{auth.profile?.email}</p>
            </span>
        },
        {
            type: 'divider',
        },
        {
            key: 'profile',
            label: <Link href='/thong-tin' >Thông tin</Link>,
            icon: <FontAwesomeIcon icon={faAddressCard} />
        },
        {
            key: 'change-password',
            label: <Link href='#' onClick={() => dispatch(toggleModal())}>Đổi mật khẩu</Link>,
            icon: <FontAwesomeIcon icon={faLock} />
        },
        {
            type: 'divider',
        },
    ];

    return (
        <Header className='!bg-[#fff] mx-4 my-2 rounded-xl !px-6'>
            <CRow className='justify-between'>
                <CCol>
                    <CRow gutter={[16, 16]}>
                        <CCol>
                            <CButton className="!h-10 !w-10 !border-none !bg-[#f0f0f0]" onClick={() => dispatch(toggleSider())}>
                                {sider.isSiderOpen ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol>
                    <Flex gap={16}>
                        <CCol>
                            <Badge count="1" size='small' color='#f50'>
                                <CButton size='large' type="default" shape='circle' icon={<FontAwesomeIcon icon={faBell} />}></CButton>
                            </Badge>
                        </CCol>
                        <CCol>
                            <CDropDown menu={{ items }} trigger={['click']} placement="bottomRight"
                                dropdownRender={(menu) => (
                                    <div className='bg-[#ffffff] shadow-lg px-2 py-2 rounded-lg border'>
                                        {React.cloneElement(menu as React.ReactElement, { style: { boxShadow: 'none' } })}
                                        <Flex justify='center'>
                                            <CButton icon={<FontAwesomeIcon icon={faSignOut} />} type='default' danger
                                                onClick={() => dispatch(logout())}>Đăng xuất</CButton>
                                        </Flex>
                                    </div>
                                )}>
                                <Avatar className='hover:bg-[#d9d9d9] hover:opacity-90 cursor-pointer shadow-sm' style={{ border: '1px solid #d9d9d9'}} size="large" src={auth.profile?.avatar} alt="Ảnh đại diện..." />
                            </CDropDown>
                            <ModalComponent />
                        </CCol>
                    </Flex>
                </CCol>
            </CRow>
        </Header>
    );
}