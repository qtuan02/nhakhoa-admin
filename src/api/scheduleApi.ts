import axiosClient from "@/config/AxiosConfig";
import { IScheduleAction } from "@/interfaces/ISchedule";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/schedule";

export const scheduleApi = {
    get(date: string) {
        return axiosClient.get(URL + "?date=" + date);
    },
    create(body: IScheduleAction) {
        return axiosClient.post(URL, body);
    },
    delete(date: string, doctor_id: string) {
        return axiosClient.delete(URL + "/" + date + "/" + doctor_id);
    },
    getDate: async (doctor_id: string) => {
        try{
            const res = await axiosClient.get(URL + "/" + doctor_id);
            return res.data.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    getTime: async (doctor_id: string, date: string) => {
        try{
            const res = await axiosClient.get(URL + "/" + doctor_id + "/" + date);
            return res.data.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    }
}