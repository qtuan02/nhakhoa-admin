import { appConfig } from "@/config/AppConfig";
import axiosClient from "@/config/AxiosConfig";
import { IChangepassword } from "@/interfaces/IChangepassword";
import { ILogin } from "@/interfaces/ILogin";
import { setCurrentUser } from "@/redux/reducers/authReducer";
import { store } from "@/redux/store";
import { logoutThunk } from "@/redux/thunks/authThunk";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";
import axios from "axios";

const baseURL = appConfig.API_LOCAL + "/v1/auth";
const URL = "/v1/auth";

export const authApi = {
    login(body: ILogin) {
		return axios.post(baseURL + "/login", body, { withCredentials: true });
	},
	refreshToken: async () => {
		try{
			const { currentUser } = store.getState().auth;
			const res = await axios.post(baseURL  + "/refresh", {}, { withCredentials: true });
			store.dispatch(setCurrentUser({
				...currentUser,
				access_token: res.data.data.access_token
			}));
            return res.data.data.access_token;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
			if (error.response.status === 401) {
				store.dispatch(logoutThunk());
			}
        }
	},
	logout() {
		return axiosClient.post(URL + "/logout");
	},
	changPassword: async (body: IChangepassword) => {
		try{
            const res = await axiosClient.post(URL + "/change-password", body);
            return res.data;
        }catch(error: any) {
            TOAST_ERROR(error?.response?.data?.message)
        }
	}
}