import axios from "axios";
import Cookies from "js-cookie"

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (401 === error.response.status) {
		alert('Pls logout and login again')
	} else {
		return Promise.reject(error);
	}
});

class Request {
	instance;
	constructor() {
		const instance = axios.create({
			baseURL: process.env.REACT_APP_API_BASE_URL,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			validateStatus: (status) => {
				return status >=200 && status < 500
			}
		});

		instance.interceptors.request.use(
			async (config: any) => {
				const accessToken = Cookies.get("accessToken");
				if (accessToken) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}

				return config;
			},
			(error) => {
				Promise.reject(error);
			}
		);

		this.instance = instance;
	}

	get = (url: string, params?: object) => {
		return this.instance.get(url, { params });
	};

	post = (url: string, data?: object, headers?: any) => {
		return this.instance.post(url, data);
	};

	put = (url: string, data?: object) => {
		return this.instance.put(url, data);
	};

	patch = (url: string, data: object) => {
		return this.instance.patch(url, data);
	};

	delete = (url: string) => {
		return this.instance.delete(url);
	};
}

export default new Request();
