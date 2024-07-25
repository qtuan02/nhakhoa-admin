"use client";
import { ILogin } from "@/interfaces/ILogin";
import { useAppDispatch } from "@/redux/hooks";
import { setRemember } from "@/redux/reducers/authenticateReducer";
import { login } from "@/redux/slices/authenticateSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormComponent from "./components/FormComponent";

export default function LoginComponent() {
    const dispatch = useAppDispatch();
    
    const navigator = useRouter();
    const [data, setData] = useState<ILogin>();

    const handleSubmit = (values: ILogin) => {
        dispatch(setRemember(values));
        dispatch(login(values));
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token') || '';
        if (token) {
            navigator.push('/');
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