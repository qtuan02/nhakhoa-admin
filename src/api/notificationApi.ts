import axiosClient from "@/config/AxiosConfig";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const URL = "/notification";

export const notificationApi = {
    get() {
        return axiosClient.get(URL);
    },
    edit(id: string) {
        return axiosClient.put(URL + "/" +id );
    }
}