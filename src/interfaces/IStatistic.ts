import { IAppointment } from "./IAppointment"
import { IHistory } from "./IHistory"
import { IInvoice } from "./IInvoice"

export interface IStatisticInvoice {
    turnover?: IStatisticTitle[],
    invoice?: IInvoice[],
}

export interface IStatisticService {
    turnover?: IStatisticTitle[],
    service?: IInvoice[],
}

export interface IStatisticAppointment {
    turnover?: IStatisticTitle[],
    appointment?: IAppointment[],
}

export interface IStatisticHistory {
    turnover?: IStatisticTitle[],
    history?: IHistory[],
}

export interface IStatisticAction {
    begin: string,
    end: string
}

export interface IStatisticServiceDetail {
    id?: string,
    name?: string,
    unit?: string,
    quantity?: number,
    quantity_sold?: number,
    total_price?: number,
    status?: number,
}

interface IStatisticTitle {
    title?: string,
    content?: string,
}