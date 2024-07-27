"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faPrint, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, TabsProps } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailComponent from "../components/DetailComponent";
import { IInvoice } from "@/interfaces/IInvoice";
import FormEditComponent from "../components/FormEditComponent";
import { TOAST_WARNING } from "@/utils/FunctionUiHelpers";
import CCol from "@/custom_antd/CCol";
import { getInvoiceState } from "@/redux/reducers/invoiceReducer";
import { invoiceEditThunk } from "@/redux/thunks/invoiceThunk";
import { invoiceApi } from "@/api/invoiceApi";

export default function EditInvoiceComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const invoice = useAppSelector(getInvoiceState);

    const [data, setData] = useState<IInvoice | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IInvoice) => {
        dispatch(invoiceEditThunk({ id: id as string, body: values }));
    }

    const getDataInvoice = async (id: string) => {
        setLoading(true);
        const value = await invoiceApi.findOne(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        if(invoice.edit === "success" || invoice.edit === "fail"){
            if(id){
                getDataInvoice(id as string);
            }else{
                TOAST_WARNING("Không tìm thấy mã hóa đơn!");
            }
        }
    }, [id, invoice.edit]);

    const items: TabsProps["items"] = [
        {
            key: "detail",
            label: "Thông tin hóa đơn",
            children: <CSkeleton loading={invoice.loading || loading}>
                <DetailComponent data={data} />
            </CSkeleton>,
        },
        {
            key: "form",
            label: "Thanh toán hóa đơn",
            children: <CSkeleton loading={invoice.loading || loading}>
                <FormEditComponent data={data} onSubmit={handleSubmit} />
            </CSkeleton >,
        }
    ];

    return (
        <>
            <CRow className="justify-end" gutter={[16, 16]}>
                <CCol>
                    <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
                </CCol>
                <CCol>
                    <CButton onClick={() => alert("In ra hóa đơn!")} type="default" icon={<FontAwesomeIcon icon={faPrint} />}>In hóa đơn</CButton>
                </CCol>
            </CRow>
            <Tabs defaultActiveKey="detail" items={items} />
        </>
    );
}