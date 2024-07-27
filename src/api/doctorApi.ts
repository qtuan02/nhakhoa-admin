import axiosClient from "@/config/AxiosConfig";

const URL = "/v1/doctor";

export const doctorApi = {
    get() {
        return axiosClient.get(URL);
    },
}