"use client"
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, Flex, Image, QRCode } from "antd";
import { useEffect, useState } from "react";
import StatisticComponent from "./components/StatisticComponent";
import CRow from "@/custom_antd/CRow";
import CCol from "@/custom_antd/CCol";
import ChartComponent from "./components/ChartComponent";
import PieComponent from "./components/PieComponent";
import { appConfig } from "@/commons/AppConfig";
import { getOverview, getOverviewAppointment, getOverviewInvoice } from "@/apis/dashboardApi";
import ProfileComponent from "../profile/Index";
import CTitle from "@/custom_antd/CTitle";
import CDescriptionItem from "@/custom_antd/CDescriptionItem";
import { formatDate } from "@/utils/FunctionHelpers";

export default function DashboardComponent() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const dashboard = useAppSelector((state) => state.dashboard);

    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (auth.profile?.role === appConfig.R_1) {
            if (dashboard.status === 'completed') {
                dispatch(getOverview());
            }

            if (dashboard.statusInvoice === 'completed') {
                dispatch(getOverviewInvoice());
            }

            if (dashboard.statusAppointment === 'completed') {
                dispatch(getOverviewAppointment());
            }
        } else {
            setChecked(true);
        }

    }, [auth.profile?.role, dashboard.status, dashboard.statusAppointment, dashboard.statusInvoice, dispatch])

    return (
        checked ?
            <div className="m-5">
                <Card
                    className="shadow-lg"
                    hoverable
                    style={{ width: 650 }}
                >
                    <Flex gap={32}>
                        <CCol>
                            <Image src={auth.profile?.avatar} alt="Hình đại diện..." height={300} width={300} />
                        </CCol>
                        <CCol>
                            <CTitle level={5} className="">{auth.profile?.role === appConfig.R_2 ? 'Nhân viên y tế' : 'Nha sĩ'}: {auth.profile?.id}</CTitle>
                            <CTitle level={4} className="!mb-1 !text-[#313b79]">{auth.profile?.name}</CTitle>
                            <CDescriptionItem title="Ngày sinh" content={formatDate(auth.profile?.birthday)} />
                            <CDescriptionItem title="Email" content={auth.profile?.email} />
                            <QRCode
                                className="shadow-md"
                                errorLevel="H"
                                value="https://www.facebook.com/nhat.khanh.228"
                                icon="/logo.png"
                            />
                        </CCol>
                    </Flex>
                </Card>
            </div>
            :
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