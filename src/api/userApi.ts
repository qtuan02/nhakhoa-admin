import axiosClient from "@/config/AxiosConfig";
import { IUser } from "@/interfaces/IUser";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/v1/user";

export const userApi = {
    get() {
        return axiosClient.get(URL);
    },
    create(body: IUser) {
        return axiosClient.post(URL, body);
    },
    edit(id: string, body: IUser) {
        return axiosClient.put(URL + "/" + id, body);
    },
    findOne: async (id: string) => {
        try{
            const res = await axiosClient.get(URL + "/" + id);
            return res.data.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    changePassword: async (id: string, password: string) => {
        try{
            const res = await axiosClient.put(URL + "/" + id, { password: password });
            return res.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    }
}