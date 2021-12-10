import { InjectedConnector } from '@web3-react/injected-connector'

export enum ConnectorNames {
	Injected = 'Injected',
	WalletConnect = 'WalletConnect',
	Binance = 'Binance'
}

export type WalletInfo = {
	imageUrl: string;
	display: string;
	isMobile: boolean;
	disabled: boolean;
};

export const connectors: { [key: string]: WalletInfo } = {
	[ConnectorNames.Injected]: {
		imageUrl: "/images/icon/metamask.svg",
		display: "Metamask",
		isMobile: false,
		disabled: false
	},
	[ConnectorNames.WalletConnect]: {
		imageUrl: "/images/icon/walletconnect.svg",
		display: "WalletConnect",
		isMobile: true,
		disabled: true
	},
	[ConnectorNames.Binance]: {
		imageUrl: "/images/icon/binance.svg",
		display: "Binance Chain Wallet",
		isMobile: false,
		disabled: true
	}
}

export const SUPPORTED_CHAINIDS = [4];

export const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINIDS })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.WalletConnect]: null,
	[ConnectorNames.Binance]: null
}
