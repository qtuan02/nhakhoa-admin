import { ICustomer } from "./ICustomer";

export interface IInvoice {
    id?: number,
    history_id?: number,
    total_price?: number,
    method_payment?: 0,
    status?: number,
    customer? :ICustomer,
}