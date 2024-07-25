import axios from "axios";
import { appConfig } from "./AppConfig";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { refreshToken } from "@/redux/slices/authenticateSlice";
import { logout } from "@/redux/reducers/authenticateReducer";
import { makeStore } from "@/redux/store";

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
		let accessToken = localStorage.getItem("access_token");
		if (accessToken ) {
			const decodedToken: any = jwtDecode<JwtPayload>(accessToken);
			const currentTime = new Date().getTime() / 1000;
			if (decodedToken.exp < currentTime) {
				const response = await refreshToken();
				accessToken = response.access_token;
			}
			config.headers.Authorization = `Bearer ${accessToken}`;
		}else{
			makeStore().dispatch(logout());
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
            makeStore().dispatch(logout());
        }
		return Promise.reject(error);
	}
);

export default axiosClient;
