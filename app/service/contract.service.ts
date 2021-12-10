import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

const ContactService = {
	get: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/contract/get-contract/${id}`,
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	save: async (body: any) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/contract/save`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default ContactService;
