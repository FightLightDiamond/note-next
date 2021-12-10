import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

const masterDataService = {
	getCountry: async () => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/country`,
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getState: async (id: number) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/state/getState/${id}`,
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default masterDataService;
