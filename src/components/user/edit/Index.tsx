"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import FormComponent from "../components/FormComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import dayjs from 'dayjs';
import { editUser, getUser } from "@/apis";

export default function EditUserComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const [data, setData] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IUser) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        values.birthday = dayjs(values.birthday).format('YYYY-MM-DD');
        dispatch(editUser({ id: id as string, data: values}));
    }

    const getDataUser = async (id: string) => {
        setLoading(true);
        const value = await getUser(id);
        setLoading(false);
        setData(value);
    }
    
    useEffect(() => {
        if(user.edit === "success" || user.edit === "fail"){
            getDataUser(id as string);
        }
    }, [id, user.edit]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Cập nhật người dùng</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={user.edit === 'wait' || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}