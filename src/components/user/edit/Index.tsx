"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faLanguage, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import FormComponent from "../components/FormComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import { editorToHtml, parseDayjsToString } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { getUserState } from "@/redux/reducers/userReducer";
import { userEditThunk } from "@/redux/thunks/userThunk";
import { userApi } from "@/api/userApi";
import CSpace from "@/custom_antd/CSpace";

export default function EditUserComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUserState);

    const [data, setData] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IUser) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        values.birthday = parseDayjsToString(values.birthday);
        dispatch(userEditThunk({ id: id as string, body: values}));
    }

    const getDataUser = async (id: string) => {
        setLoading(true);
        const value = await userApi.findOne(id);
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
                <CSpace>
                    <CButton link={"/nguoi-dung/dich/" + id} type="default" icon={<FontAwesomeIcon icon={faLanguage} />}>Ngôn ngữ khác</CButton>
                    <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
                </CSpace>
            </CRow>
            <CSkeleton loading={user.edit === "wait" || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}