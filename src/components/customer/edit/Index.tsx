"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from "../components/FormComponent";
import { ICustomer } from "@/interfaces/ICustomer";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useParams } from "next/navigation";
import { editCustomer, getCustomer } from "@/apis";
import { useEffect, useState } from "react";

export default function EditCustomerComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) => state.customer);

    const [data, setData] = useState<ICustomer | undefined>(undefined);

    const handleSubmit = (values: ICustomer) => {
        values.birthday = dayjs(values.birthday).format('YYYY-MM-DD');
        dispatch(editCustomer({ id: id as string, data: values}));
    }

    const getDataCustomer = async (id: string) => {
        const value = await getCustomer(id);
        setData(value);
    }

    useEffect(() => {
        if(customer.edit === 'success' || customer.edit === 'fail'){
            getDataCustomer(id as string);
        }
    }, [id, customer.edit]);

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Chỉnh sửa khách hàng</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <CSkeleton loading={customer.edit === 'wait'}>
                <FormComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton>
        </>
    );
}