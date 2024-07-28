import axiosClient from "@/config/AxiosConfig";

const URL = "/v1/statistics";

export const statisticsApi = {
    getInvoice(begin: string, end: string) {
        return axiosClient.get(URL + "/invoice?begin-date=" + begin + "&end-date=" + end);
    },
    getService(begin: string, end: string) {
        return axiosClient.get(URL + "/service?begin-date=" + begin + "&end-date=" + end);
    },
    getAppointment(begin: string, end: string) {
        return axiosClient.get(URL + "/appointment?begin-date=" + begin + "&end-date=" + end);
    },
    getHistory(begin: string, end: string) {
        return axiosClient.get(URL + "/history?begin-date=" + begin + "&end-date=" + end);
    }
}