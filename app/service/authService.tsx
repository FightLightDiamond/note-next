import Request from "../request";

const serverEndpoint =
	process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
	"https://ipexapi.sotatek.works/api/v1";

interface IAuthData {
	"email": string,
	"password": string,
}

interface ISignInData extends IAuthData {
}

interface ISignUpData extends IAuthData {
	rePassword: string
}

interface ISignIn2FAData extends IAuthData {
	"code": string
}

interface IVerificationEmailSignupData {
	email: string,
	code: string
}

interface ISendVerifyEmailLoginData {
	email: string
}

interface ISend2FAEnableEmailData extends ISendVerifyEmailLoginData {
}

interface ISetTwoFactorAuthData {
	token: string,
	emailOtp: string
}

interface IDisableTwoFactorAuthData {
	token: string
}

interface IChangePassword {
	oldPassword: string,
	newPassword: string,
	reNewPassword: string
}

const authService = {
	signIn: async (credentials: ISignInData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/sign-in`,
				credentials
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	signIn2FA: async (credentials: ISignIn2FAData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/sign-in-two-factor`,
				credentials
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	signUp: async (credentials: ISignUpData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/sign-up`,
				credentials
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	forgotPassword: async (email: string) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/forgot-password`,
				{email}
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	resetPassword: async (newPassword: string, id: string | string[] | undefined, code: string | string[] | undefined) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/reset-password`,
				{newPassword, id, code, reNewPassword: newPassword}
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	verifyEmailSignUp: async (verifyEmailSignUpData: IVerificationEmailSignupData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/verification`,
				verifyEmailSignUpData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	requestTwoFactorAuth: async () => {
		try {
			const response = await Request.get(
				`${serverEndpoint}/auth/two-factor-auth`
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	setTwoFactorAuth: async (setTwoFactorAuthData: ISetTwoFactorAuthData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/two-factor-auth`,
				setTwoFactorAuthData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	disableTwoFactorAuth: async (disableTwoFactorAuthData: IDisableTwoFactorAuthData) => {
		try {
			const response = await Request.put(
				`${serverEndpoint}/auth/disable-two-factor-auth`,
				disableTwoFactorAuthData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	changePassword: async (changePasswordData: IChangePassword) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/change-password`,
				changePasswordData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	requestVerifyEmailLogin: async (requestVerifyEmailLoginData: ISendVerifyEmailLoginData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/request-email-login`,
				requestVerifyEmailLoginData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	send2FAEnableOtpEmail: async (send2FAEnableOtpEmailData: ISend2FAEnableEmailData) => {
		try {
			const response = await Request.post(
				`${serverEndpoint}/auth/send-email-verification`,
				send2FAEnableOtpEmailData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	checkTokenJWT: async () => {
		try {
			const response = await Request.get(`${serverEndpoint}/auth/jwt/check`);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	getRequest() {
		return Request;
	}
};

export default authService;
