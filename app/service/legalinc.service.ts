import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

interface ICreateSPVBody {
	assetProfileId: string
}

const legalincService = {
	createSPV: async (createSPVBody: ICreateSPVBody) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/order/create`,
				createSPVBody
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default legalincService;
