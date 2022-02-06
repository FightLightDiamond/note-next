import Request from "../request";
const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"http://localhost:4000/api/";

const MessageService = {
	get: async () => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/messages/`
			);

			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default MessageService;
