import CCard from "@/custom_antd/CCard";
import CCol from "@/custom_antd/CCol";
import CRow from "@/custom_antd/CRow";
import CTitle from "@/custom_antd/CTitle";
import { IOverview } from "@/interfaces/IOverview";
import { parseHTML } from "@/utils/FunctionHelpers";

interface StatisticComponentProps {
    data?: IOverview[];
}

export default function StatisticComponent({ data }: StatisticComponentProps){
    return (
        <CRow gutter={[16, 16]}>
            {data?.map((item, index) => 
                <CCol span={6} key={index}>
                    <CCard style={{ width: "100%", height: "150px" }} className="shadow-md">
                        <CTitle level={4}>{item.title}</CTitle>
                        <p className="font-[700] text-purple-700 ts-18">{item.total}</p>
                        <p className="mt-1 ts-14 italic opacity-75" dangerouslySetInnerHTML={parseHTML(item?.message)}></p>
                    </CCard>
                </CCol>
            )}
        </CRow>
    );
}