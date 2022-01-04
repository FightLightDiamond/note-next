import {
	NoEthereumProviderError,
	UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {UnsupportedChainIdError} from "@web3-react/core";

export const ERROR_CODE_CONNECTOR = {
	NoEthereumProviderError: 1,
	UnsupportedChainIdError: 2,
	UserRejectedRequestErrorInjected: 3,
	other: 4
}

export function getErrorMessage(error: Error) {
	if (error instanceof NoEthereumProviderError) {
		return {
			errorCode: ERROR_CODE_CONNECTOR.NoEthereumProviderError,
			message: 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
		}
	} else if (error instanceof UnsupportedChainIdError) {
		return {
			errorCode: ERROR_CODE_CONNECTOR.UnsupportedChainIdError,
			message: "You're connected to an unsupported network."
		}
	} else if (error instanceof UserRejectedRequestErrorInjected) {
		return {
			errorCode: ERROR_CODE_CONNECTOR.UserRejectedRequestErrorInjected,
			message: 'Please authorize this website to access your Ethereum account.'
		}
	} else {
		console.error(error)
		return {
			errorCode: ERROR_CODE_CONNECTOR.UserRejectedRequestErrorInjected,
			message: 'An unknown error occurred. Check the console for more details.'
		}
	}
}
