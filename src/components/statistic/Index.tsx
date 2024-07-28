"use client";
import { Tabs, TabsProps } from "antd";
import InvoiceComponent from "./components/InvoiceComponent";
import ServiceComponent from "./components/ServiceComponent";
import AppointmentComponent from "./components/AppointmentComponent";
import HistoryComponent from "./components/HistoryComponent";

export default function StatisticComponent() {
    const items: TabsProps["items"] = [
        {
            key: "statistic-invoice",
            label: <p className="px-5">Thống kê hóa đơn</p>,
            children: <InvoiceComponent />
        },
        {
            key: "statistic-service",
            label: <p className="px-5">Thống kê dịch vụ</p>,
            children: <ServiceComponent />
        },
        {
            key: "statistic-appointment",
            label: <p className="px-5">Thống kê lịch hẹn</p>,
            children: <AppointmentComponent />
        },
        {
            key: "statistic-history",
            label: <p className="px-5">Thống kê lịch khám</p>,
            children: <HistoryComponent />
        },
    ];

    return (
        <Tabs defaultActiveKey="statistic-invoice" items={items} />
    );
}