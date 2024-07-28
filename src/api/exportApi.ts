import axiosClient from "@/config/AxiosConfig";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { saveAs } from 'file-saver';

const URL = "/v1/export";

export const exportApi = {
    exportService: async (begin: string, end: string) => {
        try{
            const res = await axiosClient.post(URL + "/service?begin-date=" + begin + "&end-date=" + end, null, {
                responseType: 'blob'
            });
            const excelBlob  = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(excelBlob , `dich-vu-${begin}-den-${end}.xlsx`);
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    exportInvoice: async (begin: string, end: string) => {
        try{
            const res = await axiosClient.post(URL + "/invoice?begin-date=" + begin + "&end-date=" + end, null, {
                responseType: 'blob'
            });
            const excelBlob  = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(excelBlob , `hoa-don-${begin}-den-${end}.xlsx`);
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    exportAppointment: async (begin: string, end: string) => {
        try{
            const res = await axiosClient.post(URL + "/appointment?begin-date=" + begin + "&end-date=" + end, null, {
                responseType: 'blob'
            });
            const excelBlob  = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(excelBlob , `lich-hen-${begin}-den-${end}.xlsx`);
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    exportHistory: async (begin: string, end: string) => {
        try{
            const res = await axiosClient.post(URL + "/history?begin-date=" + begin + "&end-date=" + end, null, {
                responseType: 'blob'
            });
            const excelBlob  = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(excelBlob , `lich-kham-${begin}-den-${end}.xlsx`);
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    }
}