"use client"
import { getOverview, getOverviewAppointment, getOverviewInvoice } from "@/apis";
import StatisticComponent from "./components/StatisticComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CSkeleton from "@/custom_antd/CSkeleton";
import { useEffect } from "react";
import ChartComponent from "./components/ChartComponent";
import CRow from "@/custom_antd/CRow";
import CCol from "@/custom_antd/CCol";
import { Flex } from "antd";
import PieComponent from "./components/PieComponent";
import CTitle from "@/custom_antd/CTitle";

export default function DashboardComponent() {
    const dispatch = useAppDispatch();
    const dashboard = useAppSelector((state) => state.dashboard);

    useEffect(() => {
        if (dashboard.status === 'completed') {
            dispatch(getOverview());
        }

        if (dashboard.statusInvoice === 'completed') {
            dispatch(getOverviewInvoice());
        }

        if (dashboard.statusAppointment === 'completed') {
            dispatch(getOverviewAppointment());
        }
    }, [dashboard.status, dashboard.statusAppointment, dashboard.statusInvoice, dispatch])

    return (
        <Flex vertical gap={16}>
            <CSkeleton loading={dashboard.loading}>
                <StatisticComponent data={dashboard.data} />
            </CSkeleton>
            <CRow gutter={[16, 0]}>
                <CCol span={16}>
                    <CSkeleton loading={dashboard.loadingInvoice}>
                        <ChartComponent data={dashboard.dataInvoice} />
                    </CSkeleton>
                </CCol>
                <CCol span={8}>
                    <CSkeleton loading={dashboard.loadingAppointment}>
                        <PieComponent data={dashboard.dataAppointment} />
                    </CSkeleton>
                </CCol>
            </CRow>
        </Flex>
    );
}