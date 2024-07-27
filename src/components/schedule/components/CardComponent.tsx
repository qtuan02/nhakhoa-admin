import React from "react";
import CTitle from "@/custom_antd/CTitle";
import { IScheduleDoctor } from "@/interfaces/ISchedule";
import { Card, Flex } from "antd"
import CRow from "@/custom_antd/CRow";
import CCol from "@/custom_antd/CCol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CButton from "@/custom_antd/CButton";
import CSpace from "@/custom_antd/CSpace";
import { useAppDispatch } from "@/redux/hooks";
import CPopConfirm from "@/custom_antd/CPopConfirm";
import { scheduleDeleteThunk } from "@/redux/thunks/scheduleThunk";

interface CardComponentProps {
    data?: IScheduleDoctor[];
    date?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ data, date }) => {
    const dispatch = useAppDispatch();

    return (
        data && date && data.length > 0 ? (
            <CRow gutter={[16, 16]}>
                {data.map((d, index) => (
                    <CCol key={index} span={6}>
                        <Card className="shadow-lg hover:shadow-2xl cursor-pointer" title={d.id + " - " + d.name} style={{ border: "1px solid #f3f3f3", height: "200px" }}
                            extra={<CSpace>
                                <CPopConfirm title={"Thông báo!!!"} description={`Bạn muốn xóa lịch làm việc của "${d.name}"`} onConfirm={() => dispatch(scheduleDeleteThunk({
                                    doctor_id: d.id as string,
                                    date: date as string
                                }))}>
                                    <CButton tooltip={"Xóa"} type="primary" size="small" danger icon={<FontAwesomeIcon icon={faTrashCan} />} className="ts-16"></CButton>
                                </CPopConfirm>
                            </CSpace>}>
                            <p className="font-bold mb-1">Thời gian:</p>

                            <CRow gutter={[16, 8]}>
                                {d.times?.map((t, index) => {
                                    return (
                                        <CCol key={index} span={12}>
                                            <Flex align="center" gap={8}><FontAwesomeIcon icon={faClockRotateLeft} className="text-green-500" />
                                                {t.time}
                                            </Flex>
                                        </CCol>
                                    )
                                })}
                            </CRow>

                        </Card>
                    </CCol>
                ))}
            </CRow>
        ) : (
            <CTitle level={4} className="!text-orange-600 !m-2">
                Không có lịch làm việc vào hôm nay!
            </CTitle>
        )
    );
};

export default CardComponent;