import axiosClient from "@/config/AxiosConfig";
import { IInvoice } from "@/interfaces/IInvoice";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import { saveAs } from 'file-saver';

const URL = "/v1/invoice";

export const invoiceApi = {
    get() {
        return axiosClient.get(URL);
    },
    edit(id: string, body: IInvoice) {
        return axiosClient.put(URL + "/" + id, body);
    },
    findOne: async (id: string) => {
        try{
            console.log(URL + "/" + id);
            const res = await axiosClient.get(URL + "/" + id);
            return res.data.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    },
    print: async (id: string) => {
        try{
            const res = await axiosClient.post(URL + "/print/" + id, null, {
                responseType: 'blob'
            });
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `hoa-don-${id}.pdf`);
        } catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
    }
}