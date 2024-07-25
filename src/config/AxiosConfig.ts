import axios from "axios";
import { appConfig } from "./AppConfig";
import { logout } from "@/redux/reducers/authReducer";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { refreshToken } from "@/redux/slices/authSlice";
import store from "@/redux/store";

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
		const { currentUser} = store.getState().auth;
		let accessToken = localStorage.getItem("access_token");
		if (accessToken ) {
			const decodedToken: any = jwtDecode<JwtPayload>(accessToken);
			const currentTime = new Date().getTime() / 1000;
			if (decodedToken.exp < currentTime) {
				const response = await refreshToken();
				accessToken = response.access_token;
			}
			config.headers.Authorization = `Bearer ${accessToken}`;
		} else{
			store.dispatch(logout());
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
