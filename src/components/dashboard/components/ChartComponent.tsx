import CTitle from "@/custom_antd/CTitle";
import { IDashboardInvoice } from "@/interfaces/IDashboard";
import { customNumberPrice } from "@/utils/FunctionHelpers";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartComponentProps {
    data?: IDashboardInvoice[];
}

export default function ChartComponent({ data }: ChartComponentProps) {
    const options: ApexOptions = {
        colors: ['#0099FF'],
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Doanh thu(VND)',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: data?.map((item) => item?.message || "...")
        },
        tooltip: {
            y: {
                formatter: (value) => {
                    return customNumberPrice(value);
                }
            }
        }
    };

    const series = [
        {
            name: 'Doanh thu',
            data: data?.map((item) => Number(item?.total || '0')) || []
        }
    ];
    
    return (
        data && data.length > 0 ? <ReactApexChart className="border shadow-lg p-5 rounded-md" options={options} series={series} height="400px" width="100%" /> : <CTitle level={4} className="!text-red-600">Không tìm thấy dữ liệu!</CTitle>
    );
}
