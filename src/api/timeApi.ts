import axiosClient from "@/config/AxiosConfig";

const URL = "/time";

export const timeApi = {
    get() {
        return axiosClient.get(URL);
    },
}