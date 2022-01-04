import ABI_CONTRACT from '../constants/abi/asset.json';
import {useWeb3React} from "@web3-react/core";
import { getContract } from '../utils/accounts'
import {useEffect, useMemo, useState} from "react";
import {ethers} from "ethers";
import {ADDRESS_CONTRACT} from "../constants/contract";

export default function useTokenContract(address?: string, contract_abi?: any){
	const [contract, setContract] = useState<any>(null);

	useEffect(() => {
		(async () => {
			const { ethereum } = window as any;
			if(!ethereum) return;
			await ethereum.send("eth_requestAccounts");
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const contract = await getContract(address ? address : ADDRESS_CONTRACT, contract_abi ? contract_abi : ABI_CONTRACT, signer);
			setContract(contract);
		})()

	}, [])

	return contract
}