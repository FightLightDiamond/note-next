import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

const CompanyService = {
	get: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/company/get-company/${id}`,
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	save: async (body: any) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/company/save`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default CompanyService;
