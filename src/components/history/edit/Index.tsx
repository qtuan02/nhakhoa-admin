"use client";
import CButton from "@/custom_antd/CButton";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IHistory } from "@/interfaces/IHistory";
import { editHistory, getHistory } from "@/redux/slices/historySlice";
import ProfileComponent from "../components/ProfileComponent";
import { Tabs, TabsProps } from "antd";
import FormEditComponent from "../components/FormEditComponent";
import { clearService, getHistoryState } from "@/redux/reducers/historyReducer";

export default function EditHistoryComponent() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const history = useAppSelector(getHistoryState);

    const [data, setData] = useState<IHistory | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: IHistory) => {
        values.services = history.services;
        dispatch(editHistory({ id: id as string, data: values }));
        dispatch(clearService());
    }

    const getDataHistory = async (id: string) => {
        setLoading(true);
        const value = await getHistory(id);
        setLoading(false);
        setData(value);
    }

    useEffect(() => {
        if (id) {
            if (history.edit === 'success' || history.edit === 'fail') {
                getDataHistory(id as string);
            }
        }
    }, [history.edit, id]);

    const items: TabsProps['items'] = [
        {
            key: 'profile',
            label: 'Thông tin lịch khám',
            children: <CSkeleton loading={loading}>
                <ProfileComponent data={data} />
            </CSkeleton>,
        },
        {
            key: 'form',
            label: 'Tiến độ lịch khám',
            children: <CSkeleton loading={history.edit === 'wait'}>
                <FormEditComponent onSubmit={handleSubmit} data={data} />
            </CSkeleton >,
        }
    ];

    return (
        <>
            <CRow className="justify-between">
                <CTitle>Chi tiết lịch khám</CTitle>
                <CButton back={true} type="primary" danger icon={<FontAwesomeIcon icon={faRotateBack} />}>Trờ lại</CButton>
            </CRow>
            <Tabs defaultActiveKey="profile" items={items} />
        </>
    );
}