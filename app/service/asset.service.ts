import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

export interface IAssetProfileBody {
	"id"?: string | string[] | undefined,
	"name": string,
	"description": string,
	"developmentStage": string,
	"subMarket": number[],
	"subCategory": number[],
	"annualGrowth": number | null,
	"startedYear": number | null,
	"incorporated": boolean,
	"ipKind": number[],
	"patentNumber": string,
	"trademarkNumber": string,
	"registeredDesignNumber": number | null,
	"yearOfIncorporation": number | null
}

export interface IOwnerProfileBody {
	"id"?: string,
	"firstName": string,
	"lastName": string,
	"ownerName": string,
	"ownerShipType": number,
	"countryId": number,
	"website": string,
	"relationship": string,
	"summary": string,
	"businessSector": string,
	"incorporated": number,
	"registration": number,
	"jurisdiction": number,
	"public": boolean,
	"traded": boolean,
	"province": string,
	"state": string,
	"exchange": string,
	"ticker": string,
	"rated": number,
	"isPublic": boolean
}

export interface IPersonalConst {
	"id"?: string,
	"notDirectCost"?: boolean,
	"employeeNumber"?: number,
	"position"?: string,
	"averageHourlyRate": number,
	"totalHours"?: number,
	"additionalCost"?: number,
	"totalCost"?: number
}

export interface FinancialProfileBody {
	"id"?: string,
	"revenueGeneration": boolean,
	"royaltyRate": number,
	"taxRate": number,
	"discountRate": number,
	"growthRate": number,
	"revenueYears": number[],
	"percentDirectCost": number,
	"developerProfitMargin": number,
	"obsolescenceFactor": number,
	"replaceTime": number,
	"personalCost": IPersonalConst[]
}

export interface IDocumentationBody {
	id?: string,
	files: File[],
	types: number[]
}

const AssetService = {
	createEmpty: async () => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/empty-asset/`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	createOrUpdateAssetProfile: async (body: IAssetProfileBody) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/asset-profile`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	requestCertificate: async (body: {
		id: string
	}) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/request-certificate`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	createOrUpdateOwnerProfile: async (body: IOwnerProfileBody) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/owner-profile`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	createOrUpdateFinancialProfile: async (body: FinancialProfileBody) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/financial-profile`,
				body
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getList: async (params: any) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/`, params
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getAssetProfile: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/asset-profile/${id}`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getCertificate: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/status/${id}`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getOwnerProfile: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/owner-profile/${id}`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getFinancialProfile: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/financial-profile/${id}`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getBusinessSector: async (params?: any) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/business-sector`, params
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getSummaryAsset: async (id?: any) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/status/${id}`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	createDocumentationAsset: async (body: any) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/document`,
				body,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getDocumentationAssetDetail: async (id: string) => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/asset/documents/${id}`);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	requestSPV: async (requestSPVBody: {id: string}) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/request-spv`,
				requestSPVBody);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	completeSPV: async (id: string) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/asset/complete-spv`,
				{id});
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default AssetService;
