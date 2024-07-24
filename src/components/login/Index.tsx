"use client";
import { ILogin } from "@/interfaces/ILogin";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { setRemember } from "@/redux/reducers/authReducer";
import { login } from "@/redux/slices/authSlice";
import FormComponent from "./components/FormComponent";



export default function LoginComponent() {
    const dispatch = useAppDispatch();
    
    const [data, setData] = useState<ILogin>();

    const handleSubmit = (values: ILogin) => {
        dispatch(setRemember(values));
        dispatch(login(values));
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token') || '';
        if (token) {
            window.location.assign('/');
        }

        const user = JSON.parse(localStorage.getItem('r_u') || '{}');
        if (user) {
            setData(user)
        }
    }, []);

    return (
        <div className="bg-login flex items-center justify-center">
            <FormComponent onSubmit={handleSubmit} data={data} />
        </div>
    );
}