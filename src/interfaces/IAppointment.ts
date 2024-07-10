import { IService } from "./IService";
import { IUser } from "./IUser";

export interface IAppointment {
    id?: number,
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
}

export interface ITime {
    time?: string,
}