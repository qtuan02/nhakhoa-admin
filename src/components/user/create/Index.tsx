"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from "../components/FormComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IUser } from "@/interfaces/IUser";
import dayjs from 'dayjs';
import { editorToHtml } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { createUser } from "@/apis";

export default function CreateUserComponent() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const handleSubmit = (values: IUser) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        values.birthday = dayjs(values.birthday).format('YYYY-MM-DD');
        dispatch(createUser(values));
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Thêm người dùng</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={user.loading}>
                <FormComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}