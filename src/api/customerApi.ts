import axiosClient from "@/config/AxiosConfig";
import { ICustomer } from "@/interfaces/ICustomer";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/customer";

export const customerApi = {
    get() {
        return axiosClient.get(URL);
    },
    create(body: ICustomer) {
        return axiosClient.post(URL, body);
    },
    edit(id: string, body: ICustomer) {
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