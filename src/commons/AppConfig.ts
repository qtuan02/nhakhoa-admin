
interface IAppConfig {
    API_LOCAL: string
    API_UPLOAD: string
}

export const appConfig: IAppConfig = {
    API_LOCAL: process.env.NEXT_PUBLIC_API_LOCAL || "",
    API_UPLOAD: process.env.NEXT_PUBLIC_API_UPLOAD || ""
}