import axios from "axios";
import { appConfig } from "./AppConfig";
import { logout } from "@/redux/reducers/authReducer";
import store from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/apis";

const axiosClient = axios.create({
  baseURL: appConfig.API_LOCAL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;

			const decodedToken: any = jwtDecode(token);
			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
				const response = await refresh();
				const newAccessToken = response.access_token;
				
				localStorage.setItem("access_token", newAccessToken);
				config.headers.Authorization = `Bearer ${newAccessToken}`;
			}
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
