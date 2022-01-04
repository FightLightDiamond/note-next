import {useState, useEffect, useContext} from "react";
import { useWeb3React} from "@web3-react/core";
import { SUPPORTED_CHAINIDS } from "../constants/connector";
import {useDispatch} from "react-redux";
import { activeConnector } from "../store/connector/connector.slice";
import { updateWalletAddress } from '../store/user/user.slice';
import {AuthContext} from "../guards/auth";
import {message} from "antd";

const useConnector = () => {
	const [validConnection, setValidConnection] = useState<boolean>(false);
	const { active, chainId, account, error, activate, connector } = useWeb3React();
	const { user } = useContext(AuthContext);

	const dispatch = useDispatch();

	useEffect(() => {
		if (active && chainId && account && !error && connector) {
			console.log("VALID CONNECTION");
			setValidConnection(SUPPORTED_CHAINIDS.indexOf(Number(chainId)) >= 0);
		}

		if (!active && !connector) {
			console.log("DISCONNECT");
			dispatch(activeConnector(null));
			setValidConnection(false);
		}
	}, [active, chainId, account, error, connector]);

	useEffect(() => {
		if(account && user?.wallet_address && (user?.wallet_address?.toLowerCase() !== account?.toLowerCase())){
			message.error('Please use registered wallet address')
		}
	}, [account])

	useEffect(() => {
		error && setValidConnection(false);
	}, [error]);

	return {
		validConnection,
		active,
		error,
		account,
		activate
	}
}

export default useConnector;