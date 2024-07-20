
interface IAppConfig {
    API_LOCAL: string,
    API_UPLOAD: string,
    R_1: string,
    R_2: string,
    R_3: string
}

export const appConfig: IAppConfig = {
    API_LOCAL: process.env.NEXT_PUBLIC_API_LOCAL || "",
    API_UPLOAD: process.env.NEXT_PUBLIC_API_UPLOAD || "",
    R_1: process.env.NEXT_PUBLIC_R_1 || "",
    R_2: process.env.NEXT_PUBLIC_R_2 || "",
    R_3: process.env.NEXT_PUBLIC_R_3 || ""
}