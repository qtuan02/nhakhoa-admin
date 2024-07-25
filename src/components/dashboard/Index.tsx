"use client"
import CSkeleton from "@/custom_antd/CSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Flex } from "antd";
import { useEffect } from "react";
import StatisticComponent from "./components/StatisticComponent";
import CRow from "@/custom_antd/CRow";
import CCol from "@/custom_antd/CCol";
import ChartComponent from "./components/ChartComponent";
import PieComponent from "./components/PieComponent";
import { getOverviewState } from "@/redux/reducers/overviewReducer";
import { getOverview, getOverviewAppointment, getOverviewInvoice } from "@/redux/slices/overviewSlice";

export default function DashboardComponent() {
    const dispatch = useAppDispatch();
    const overview = useAppSelector(getOverviewState);

    useEffect(() => {
        if (!overview.loading) {
            dispatch(getOverview());
        }

        if (!overview.loadingInvoice) {
            dispatch(getOverviewInvoice());
        }

        if (!overview.loadingAppointment) {
            dispatch(getOverviewAppointment());
        }

    }, [dispatch, overview.loading, overview.loadingAppointment, overview.loadingInvoice])

    return (
        // <div className="m-5">
        //     <Card
        //         className="shadow-lg border-[2px]"
        //         hoverable
        //         style={{ width: 650 }}
        //     >
        //         <CTitle level={3} className="text-center bg-blue-400 py-2">THẺ Y TẾ</CTitle>
        //         <Flex gap={32}>
        //             <CCol>
        //                 <Image src={auth.profile?.avatar} alt="Hình đại diện..." height={300} width={300} />
        //             </CCol>
        //             <CCol>
        //                 <CTitle level={5} className="">{auth.profile?.role === appConfig.R_2 ? 'Nhân viên y tế' : 'Nha sĩ'}: {auth.profile?.id}</CTitle>
        //                 <CTitle level={4} className="!mb-1 !text-[#313b79]">{auth.profile?.name}</CTitle>
        //                 <CDescriptionItem title="Ngày sinh" content={formatDate(auth.profile?.birthday)} />
        //                 <CDescriptionItem title="Email" content={auth.profile?.email} />
        //                 <QRCode
        //                     className="shadow-md"
        //                     errorLevel="H"
        //                     value="https://www.facebook.com/nhat.khanh.228"
        //                     icon="/logo.png"
        //                 />
        //             </CCol>
        //         </Flex>
        //     </Card>
        // </div>

        <Flex vertical gap={16}>
            <CSkeleton loading={overview.loading}>
                <StatisticComponent data={overview.data} />
            </CSkeleton>
            <CRow gutter={[16, 0]}>
                <CCol span={16}>
                    <CSkeleton loading={overview.loadingInvoice}>
                        <ChartComponent data={overview.dataInvoice} />
                    </CSkeleton>
                </CCol>
                <CCol span={8}>
                    <CSkeleton loading={overview.loadingAppointment}>
                        <PieComponent data={overview.dataAppointment} />
                    </CSkeleton>
                </CCol>
            </CRow>
        </Flex>
    );
}