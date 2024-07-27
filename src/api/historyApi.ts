import axiosClient from "@/config/AxiosConfig";
import { IHistory } from "@/interfaces/IHistory";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/v1/history";

export const historyApi = {
    get() {
        return axiosClient.get(URL);
    },
    create(body: IHistory) {
        return axiosClient.post(URL, body);
    },
    edit(id: string, body: IHistory) {
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