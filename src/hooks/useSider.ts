import { appConfig } from '@/config/AppConfig';
import { useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';
import { SIDER_MENU, SIDER_MENU_DOCTOR, SIDER_MENU_EMPLOYEE } from '@/utils/Option';
import { useEffect, useState } from 'react';

const useSider = () => {
    const [ menu, setMenu ] = useState(SIDER_MENU);
    const auth = useAppSelector(getAuthState);

    useEffect(() => {
        if(auth.currentUser?.role === appConfig.R_2){
            setMenu(SIDER_MENU_EMPLOYEE);
        }
        
        if(auth.currentUser?.role === appConfig.R_3){
            setMenu(SIDER_MENU_DOCTOR);
        }
    }, [auth.currentUser?.role])
    
    return menu;
};

export default useSider;