import axios from "axios";
import { appConfig } from "./AppConfig";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { logoutToken, refreshToken } from "@/redux/slices/authenticateSlice";
import { store } from "@/redux/store";

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
		const { currentUser } = store.getState().authenticate;
		if (currentUser && currentUser.access_token) {
			const decodedToken: any = jwtDecode<JwtPayload>(currentUser.access_token);
			const currentTime = new Date().getTime() / 1000;
			if (decodedToken.exp < currentTime) {
				const refresh_token = await refreshToken();
				config.headers.Authorization = `Bearer ${refresh_token}`;
			}else{
				config.headers.Authorization = `Bearer ${currentUser.access_token}`;
			}
		}else{
			store.dispatch(logoutToken());
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
		return Promise.reject(error);
	}
);

export default axiosClient;
