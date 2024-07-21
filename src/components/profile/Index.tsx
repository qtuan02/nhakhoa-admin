"use client";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppSelector } from "@/redux/hooks";

export default function ProfileComponent() {
    const auth = useAppSelector((state) => state.auth);
    console.log(auth.profile);
    
    return (
        <>
            
        </>
    );
}