import axiosClient from "@/config/AxiosConfig";
import { IAppointment } from "@/interfaces/IAppointment";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/v1/appointment";

export const appointmentApi = {
    get() {
        return axiosClient.get(URL);
    },
    create(body: IAppointment) {
        return axiosClient.post(URL, body);
    },
    delete(id: string) {
        return axiosClient.delete(URL + "/" + id);
    },
    edit(id: string, body: IAppointment) {
        return axiosClient.put(URL + "/" + id, body);
    },
    findOne: async (id: string) => {
        try{
            const res = await axiosClient.get(URL + "/" + id);
            return res.data.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    }
}