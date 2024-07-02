import CButton from '@/custom_antd/CButton';
import CCol from '@/custom_antd/CCol';
import CRow from '@/custom_antd/CRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSider } from '@/redux/reducers/siderReducer';
import { RootState } from '@/redux/store';
import { faBars, faBell, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from 'antd';
const { Header } = Layout;

export default function HeaderComponent() {
    const isSiderOpen = useAppSelector((state: RootState) => state.sider.isSiderOpen);
    const dispatch = useAppDispatch();

    return (
        <Header className='!bg-[#fff] mx-4 my-2 rounded-xl !px-6'>
            <CRow className='justify-between'>
                <CCol>
                    <CRow gutter={[16, 16]}>
                        <CCol>
                            <CButton className="!h-10 !w-10 !border-none !bg-[#f0f0f0]" onClick={() => dispatch(toggleSider())}>
                                {isSiderOpen ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol>
                    <CRow className='gap-5'>
                        <CCol>
                            <CButton type="text" shape='circle' icon={<FontAwesomeIcon icon={faBell} />} className='ts-16'></CButton>
                        </CCol>
                        <CCol>
                            Avatar
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </Header>
    );
}