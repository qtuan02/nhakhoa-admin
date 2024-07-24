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
import { editorToHtml, parseDayjsToString } from "@/utils/FunctionHelpers";
import { RawDraftContentState } from "draft-js";
import { createUser } from "@/redux/slices/userSlice";
import { getUserState } from "@/redux/reducers/userReducer";

export default function CreateUserComponent() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUserState);

    const handleSubmit = (values: IUser) => {
        values.description = editorToHtml(values.description as RawDraftContentState);
        values.birthday = parseDayjsToString(values.birthday);
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