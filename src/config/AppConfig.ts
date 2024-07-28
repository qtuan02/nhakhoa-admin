
interface IAppConfig {
    API_LOCAL: string,
    API_UPLOAD: string,
    R_1: string,
    R_2: string,
    R_3: string,
    PUSHER_APP_ID: string,
    PUSHER_APP_KEY: string,
    PUSHER_APP_SECRET: string,
    PUSHER_APP_CLUSTER: string
}

export const appConfig: IAppConfig = {
    API_LOCAL: process.env.NEXT_PUBLIC_API_LOCAL || "",
    API_UPLOAD: process.env.NEXT_PUBLIC_API_UPLOAD || "",
    R_1: process.env.NEXT_PUBLIC_R_1 || "",
    R_2: process.env.NEXT_PUBLIC_R_2 || "",
    R_3: process.env.NEXT_PUBLIC_R_3 || "",
    PUSHER_APP_ID: process.env.NEXT_PUBLIC_PUSHER_APP_ID || "",
    PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "",
    PUSHER_APP_SECRET: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET || "",
    PUSHER_APP_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || ""
}