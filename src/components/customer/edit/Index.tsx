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
import { useParams } from "next/navigation";
import { editCustomer, getCustomer } from "@/redux/slices/customerSlice";
import { useEffect, useState } from "react";
import { parseDayjsToString } from "@/utils/FunctionHelpers";
import { getCustomerState } from "@/redux/reducers/customerReducer";

export default function EditCustomerComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const customer = useAppSelector(getCustomerState);

    const [data, setData] = useState<ICustomer | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: ICustomer) => {
        values.birthday = parseDayjsToString(values.birthday);
        dispatch(editCustomer({ id: id as string, data: values}));
    }

    const getDataCustomer = async (id: string) => {
        setLoading(true);
        const value = await getCustomer(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        if(customer.edit === "success" || customer.edit === "fail"){
            getDataCustomer(id as string);
        }
    }, [id, customer.edit]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Chỉnh sửa khách hàng</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={customer.edit === "wait" || loading}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}