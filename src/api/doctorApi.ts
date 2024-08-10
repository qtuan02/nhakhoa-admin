import axiosClient from "@/config/AxiosConfig";
import { TOAST_WARNING } from "@/utils/FunctionUiHelpers";

const URL = "/doctor";

export const doctorApi = {
    get() {
        return axiosClient.get(URL);
    },
    getDoctor: async (date: string, time: string) => {
        try{
            const res = await axiosClient.get(URL + "?date=" + date + "&time=" + time);
            return res.data.data;
        }catch(error: any) {
            TOAST_WARNING(error?.response?.data?.message)
        }
    }
}