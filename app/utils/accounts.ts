import { ethers } from "ethers";
export const shortenAddress = (
	address: string,
	head: number,
	tail: number
) => {
	const length = address.length;
	return `${address.substr(0, head)}...${address.substr(length - tail, tail)}`
}

export function isAddress(value: string) {
	try {
		return ethers.utils.getAddress(value.toLowerCase())
	} catch {
		return false
	}
}

export function getContract(address: string, abi: any, signer: any){
	try {
		if (!isAddress(address) || address === ethers.constants.AddressZero) {
			throw new Error(`Invalid 'address' parameter '${address}'.`)
		}
		return new ethers.Contract(address, abi, signer);
	} catch {
		return null;
	}
}