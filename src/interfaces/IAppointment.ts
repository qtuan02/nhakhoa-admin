import { IService } from "./IService";
import { IUser } from "./IUser";

export interface IAppointment {
    id?: string,
    name?: string,
    phone?: string,
    date?: string,
    time?: string,
    status?: number,
    note?: string,
    doctor?: IUser,
    doctor_id?: string,
    services?: IService[]
}

export interface IDate {
    date?: string,
    status?: number
}

export interface ITime {
    id?: string,
    time?: string,
    status?: number
}