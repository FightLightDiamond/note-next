import Request from "../request";
const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

const ExplorerService = {
	getExplorerList: async (params?: any) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/list-token`, params
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getExplorerDetails: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/token/${id}`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default ExplorerService;
