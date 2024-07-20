import axios from "axios";
import { appConfig } from "./AppConfig";
import { isLogin, logout } from "@/redux/reducers/authReducer";
import store from "@/redux/store";
import { TOAST_ERROR } from "@/utils/FunctionUiHelpers";

const axiosClient = axios.create({
	baseURL: appConfig.API_LOCAL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
	withCredentials: true,
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
            store.dispatch(logout());
		}
		return Promise.reject(error);
	}
);

export default axiosClient;