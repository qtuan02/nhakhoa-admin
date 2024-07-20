import CTitle from "@/custom_antd/CTitle";
import { IDashboardAppoinment } from "@/interfaces/IDashboard";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface PieComponentProps {
    data?: IDashboardAppoinment[];
}

export default function PieComponent({ data }: PieComponentProps) {
    const options: ApexOptions  = {
        chart: {
            width: '100%',
            type: 'donut'
        },
        legend: {
            position: 'bottom',
        },
        title: {
            text: 'Thống kê lịch hẹn',
            align: 'center',
            style: {
                fontSize: '20px',
                fontWeight: 600,
            }
        },
        tooltip: {
            enabled: true,
        },
        labels: data?.map(item => item?.message as string) || [],
        plotOptions: {
            pie: {
                donut:{
                    labels: {
                        show: true,
                        total: {
                            color: "#000",
                            label: "Tổng",
                            show: true
                        }
                    }
                }
            }
        },
        colors: ['#FF3366', '#00FF00'],
    };

    const series = data?.map(item => Number(item?.total)) || [];
    // const series = [5, 7];


    return (
        data && data.length > 0 ? <ReactApexChart className="border shadow-md p-5 rounded-lg" options={options} series={series} type="donut" height="420px" width="100%" /> : <CTitle level={4} className="!text-red-600">Không tìm thấy dữ liệu!</CTitle>
    );
}