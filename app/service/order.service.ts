import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

interface IGetListOrderData {
	size?: string
}

const orderService = {
	createOrder: async () => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/payment/create-order`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getOrderStatus: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/payment/${id}/status`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getListOrder: async (getListOrderData: IGetListOrderData) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/payment/orders`,
				getListOrderData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default orderService;
