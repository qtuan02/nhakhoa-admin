import axiosClient from "@/config/AxiosConfig";
import { ICategory } from "@/interfaces/ICategory";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/category";

export const categoryApi = {
    get() {
        return axiosClient.get(URL);
    },
    create(body: ICategory) {
        return axiosClient.post(URL, body);
    },
    delete(id: string) {
        return axiosClient.delete(URL + "/" + id);
    },
    edit(id: string, body: ICategory) {
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