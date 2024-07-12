import { ICustomer } from "./ICustomer";
import { IService } from "./IService";
import { IUser } from "./IUser";

export interface IHistory {
    id?: number,
    date?: Date | string,
    time?: string,
    total_price?: number,
    customer_id?: string,
    customer_name?: string,
    note?: string,
    doctor_id?: string,
    doctor_name?: string,
    customer?: ICustomer,
    doctor?: IUser,
    services?: IHistoryDetail[],
    status?: number
}

export interface IHistoryDetail {
    id?: number,
    name?: string,
    quantity?: number,
    price?: number,
}