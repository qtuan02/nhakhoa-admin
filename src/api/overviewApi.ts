import axiosClient from "@/config/AxiosConfig";

const URL = "/v1/overview";

export const overviewApi = {
    get() {
        return axiosClient.get(URL);
    },
    getInvoice() {
        return axiosClient.get(URL + "/invoice");
    },
    getAppointment() {
        return axiosClient.get(URL + "/appointment");
    }
}