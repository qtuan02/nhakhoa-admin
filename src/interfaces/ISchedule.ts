import { ITime } from "./IAppointment"

export interface ISchedule {
    key?: string,
    date?: string,
    doctor?: IScheduleDoctor[]
}

export interface IScheduleDoctor {
    id?: string,
    name?: string,
    times?: ITime[]
}