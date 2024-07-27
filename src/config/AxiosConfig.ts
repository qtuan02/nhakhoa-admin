import { appConfig } from "./AppConfig";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { store } from "@/redux/store";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { authApi } from "@/api/authenticateApi";
import { logoutThunk } from "@/redux/thunks/authThunk";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
	headers: AxiosRequestHeaders;
}

const axiosClient = axios.create({
	baseURL: appConfig.API_LOCAL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
	withCredentials: true,
});

axiosClient.interceptors.request.use(
	async (config: AdaptAxiosRequestConfig) => {
		const { currentUser } = store.getState().authenticate;
		if (currentUser && currentUser.access_token) {
			const decodedToken: any = jwtDecode<JwtPayload>(currentUser.access_token);
			const currentTime = new Date().getTime() / 1000;
			if (decodedToken.exp < currentTime) {
				const refresh_token = await authApi.refreshToken();
				config.headers.Authorization = `Bearer ${refresh_token}`;
			}else{
				config.headers.Authorization = `Bearer ${currentUser.access_token}`;
			}
		}else{
			store.dispatch(logoutThunk());
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError<AdaptAxiosRequestConfig>) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
