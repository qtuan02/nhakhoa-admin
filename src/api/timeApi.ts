import axiosClient from "@/config/AxiosConfig";

const URL = "/v1/time";

export const timeApi = {
    get() {
        return axiosClient.get(URL);
    },
}