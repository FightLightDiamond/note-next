import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

interface IBodyGetSignatureNFT {
	signature: {
		r: string,
		s: string,
		_vs: string,
		recoveryParam: number,
		v: number
	},
	address: string,
	assetId: any
}

interface IBodyUpdateNftTransactionHash {
	tx: string,
	assetId: string | null | undefined
}

interface IBodyGetSignatureTransferNFT extends IBodyGetSignatureNFT {
	toAddress: string | null
}

interface ISaveTransferAssetTransaction {
	email: string,
	isIndividual: boolean,
	firstName: string,
	lastName: string,
	bussinessName: string,
	phoneNumber: string,
	address1: string,
	address2: string,
	countryId: number,
	city: string,
	state: string,
	postalCode: string,
	assetId: string,
	tx: string,
}

const UserService = {
	getMe: async () => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/user`);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	updateWalletAddress: async (address: string) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/user/wallet`,
				{
					address
				}
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getSignatureNFT: async (body: IBodyGetSignatureNFT) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/user/mint-nft`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	updateNftTransactionHash: async (body: IBodyUpdateNftTransactionHash) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/user/update-nft`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getSignatureTransferNFT: async (body: IBodyGetSignatureTransferNFT) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/user/transfer-nft`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getAddressByEmail: async (email: string) => {
		try {
			const response = await Request.get(`${serverEndpoint}/user/user-wallet?email=${email}`);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	saveTransferAssetTransaction: async (body: ISaveTransferAssetTransaction) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/transfer-asset`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default UserService;
