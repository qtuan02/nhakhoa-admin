import axiosClient from "@/config/AxiosConfig";

const URL = "/doctor";

export const doctorApi = {
    get() {
        return axiosClient.get(URL);
    },
}