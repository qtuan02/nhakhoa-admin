"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from "../components/FormComponent";
import { ICustomer } from "@/interfaces/ICustomer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CSkeleton from "@/custom_antd/CSkeleton";
import { createCustomer } from "@/apis";
import { parseDayjsToString } from "@/utils/FunctionHelpers";

export default function CreateCustomerComponent() {
    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) => state.customer);

    const handleSubmit = (values: ICustomer) => {
        values.birthday = parseDayjsToString(values.birthday);
        dispatch(createCustomer(values));
    }

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Thêm khách hàng</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={customer.loading}>
                <FormComponent onSubmit={handleSubmit} />
            </CSkeleton>
        </>
    );
}