import { ICustomer } from "./ICustomer";
import { IUser } from "./IUser";

export interface IInvoice {
    id?: number,
    history_id?: number,
    total_price?: number,
    method_payment?: number,
    status?: number,
    customer? :ICustomer,
    user?: IUser,
}