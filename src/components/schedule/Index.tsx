"use client"
import { getSchedules } from "@/redux/slices/scheduleSlice";
import CButton from "@/custom_antd/CButton";
import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import CSkeleton from "@/custom_antd/CSkeleton";
import CTitle from "@/custom_antd/CTitle";
import { ISchedule } from "@/interfaces/ISchedule";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatDate, parseDayjsToString } from "@/utils/FunctionHelpers";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Tabs, TabsProps } from "antd";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import CardComponent from "./components/CardComponent";
import { getScheduleState } from "@/redux/reducers/scheduleReducer";

export default function ScheduleComponent() {
    const dispatch = useAppDispatch();
    const schedule = useAppSelector(getScheduleState);

    useEffect(() => {
        if(schedule.status === "completed" || schedule.status === "rejected") {
            dispatch(getSchedules(""));
        }
    }, [dispatch, schedule.status]);

    const getMonday = (date: Dayjs): Dayjs => {
        const day = date.day();     
        return day === 0 ? date.day(-6) : date.day(1);
    };

    const defaultMonday = getMonday(dayjs());

    const disabledDate = (current: Dayjs): boolean => {
        return current.day() !== 1;
    };

    const items: TabsProps["items"] = schedule?.data?.map((s: ISchedule) => ({
        key: s.key as string,
        label: <p className="px-4">Thứ {s.key} - {formatDate(s.date)}</p>,
        children: <CardComponent data={s.doctor} date={s.date} />
    }) || []);

    const handleChange = (date: Dayjs) => {
        dispatch(getSchedules(parseDayjsToString(date)));
    }

    return (
        <>
            <CRow className="justify-between">
                <CCol>
                    <CTitle>Lịch làm việc</CTitle>
                    <DatePicker className="h-10" onChange={handleChange} defaultValue={defaultMonday} format="DD/MM/YYYY" allowClear={false} disabledDate={disabledDate} />
                </CCol>
                <CCol>
                    <CButton link="/lich-lam-viec/them" type="primary" icon={<FontAwesomeIcon icon={faCirclePlus} />}>Tạo lịch làm việc</CButton>
                </CCol>
            </CRow>
            <br />
            <CSkeleton loading={schedule.loading}>
                {schedule.data && schedule.data.length === 0 ? <CTitle level={4} className="!text-red-500">Không tìm thấy lịch làm việc!</CTitle>  : <Tabs items={items} />}
            </CSkeleton>
        </>
    );
}