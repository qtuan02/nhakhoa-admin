import { IInvoice } from "@/interfaces/IInvoice";

interface IInvoiceState {
    loading?: boolean;
    status?: 'pending' | 'completed' | 'rejected';
    edit?: 'wait' | 'success' | 'fail';
    data: IInvoice[];
};

const initialState: IInvoiceState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: []
};