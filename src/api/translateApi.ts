import axiosClient from "@/config/AxiosConfig";
import { ICategory } from "@/interfaces/ICategory";
import { IService } from "@/interfaces/IService";
import { IUser } from "@/interfaces/IUser";
import { TOAST_ERROR, TOAST_WARNING } from "@/utils/FunctionUiHelpers";

const URL = "/translate";

export const translateApi = {
    findOneCategory: async (id: string) => {
        try{
            const res = await axiosClient.get(URL + "/category/" + id);
            return res.data.data;
        } catch(error: any) {
            TOAST_WARNING(error?.response?.data?.message)
        }
    },
    translateCategory: async (id: string, body: ICategory) => {
        try{
            const res = await axiosClient.patch(URL + "/category/" + id, body);
            return res.data;
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    findOneService: async (id: string) => {
        try{
            const res = await axiosClient.get(URL + "/service/" + id);
            return res.data.data;
        } catch(error: any) {
            TOAST_WARNING(error?.response?.data?.message)
        }
    },
    translateService: async (id: string, body: IService) => {
        try{
            const res = await axiosClient.patch(URL + "/service/" + id, body);
            return res.data;
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    findOneDoctor: async (id: string) => {
        try{
            const res = await axiosClient.get(URL + "/doctor/" + id);
            return res.data.data;
        } catch(error: any) {
            TOAST_WARNING(error?.response?.data?.message)
        }
    },
    translateDoctor: async (id: string, body: IUser) => {
        try{
            const res = await axiosClient.patch(URL + "/doctor/" + id, body);
            return res.data;
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
}