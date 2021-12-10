import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

interface ICreatePaymentData {
	orderId: string
}

interface ICreateCheckoutSessionData extends ICreatePaymentData {

}

const stripService = {
	createPayment: async (createPaymentData: ICreatePaymentData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/payment/create-payment-intent`,
				createPaymentData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	cancelPayment: async (id: string) => {
		try {
			const response = await Request.put(
				`${serverEndpoint}/payment/${id}/cancel`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	createCheckoutSession: async (body: ICreateCheckoutSessionData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/payment/create-checkout-session`, body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default stripService;
