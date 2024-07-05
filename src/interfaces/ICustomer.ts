import { IHistory } from "./IHistory";
import { IUser } from "./IUser";

export interface ICustomer {
    id?: string,
    name: string,
    phone_number?: string,
    birthday?: Date | string,
    email?: string,
    gender?: number,
    address?: string,
    doctor?: IUser,
    histories?: IHistory[]
}