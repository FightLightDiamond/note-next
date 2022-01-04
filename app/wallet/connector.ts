import {InjectedConnector} from '@web3-react/injected-connector'
import {BigNumber, ethers} from "ethers";
import {JsonRpcProvider} from "@ethersproject/providers/src.ts/json-rpc-provider";
import CONTRACT_ABI from "../constants/abi/asset.json";
import {ADDRESS_CONTRACT} from "../constants/contract";
import {config} from "../../config";

export const connectMetaMark = new InjectedConnector({supportedChainIds: [parseInt(config().chainID)]})

/**
 * MetaMark Connect
 */
export default class MetaMarkConnect {

  metaMark: JsonRpcProvider

  /**
   * @param ethereum
   */
  constructor(ethereum: any) {
    this.metaMark = new ethers.providers.Web3Provider(ethereum)
  }

  /**
   * get Meta Mark
   */
  getMetaMark() {
    return this.metaMark
  }

  /**
   * get Current Block Number
   */
  async getCurrentBlockNumber() {
    return await this.metaMark.getBlockNumber()
  }

  /**
   * get Balance
   */
  async getBalance(): Promise<BigNumber> {
    return await this.metaMark.getBalance('ethers.eth')
  }

  /**
   * get Balance Format
   */
  async getBalanceFormat() {
    const balance = await this.getBalance()
    return ethers.utils.formatEther(balance)
  }

  /**
   * split Signature
   */
  async splitSignature() {
    const signer = this.metaMark.getSigner();
    const signature = await signer.signMessage('MINT_NFT');
    return ethers.utils.splitSignature(signature);
  }

  /**
   * get Address
   */
  async getAddress() {
    const signer = this.metaMark.getSigner();
    return await signer.getAddress();
  }

  /**
   * get Signer Contract
   */
  getSignerContract() {
    const signer = this.metaMark.getSigner();
    return this.getContract(ADDRESS_CONTRACT, CONTRACT_ABI, signer);
  }

  /**
   * Get Token Uri
   * @param assetId
   */
  getTokenUri(assetId: string) {
    const tokenUri = config().tokenUri
    return `${tokenUri}/${assetId}`
  }

  /**
   * Get None
   * @param address
   */
  async getNone(address: string) {
    const assetContract = await this.getAssetNftContract()
    return await assetContract.functions['getNonce'](address);
  }

  /**
   * Get getNoneString
   * @param address
   */
  async getNoneString(address: string) {
    const nonce = await this.getNone(address)
    return nonce.toString()
  }

  /**
   *
   * @param address
   * @param abi
   * @param signer
   */
  getContract(address: string, abi: any, signer: any) {
    return new ethers.Contract(address, abi, signer);
  }

  /**
   * get Asset Nft Contract
   */
  getAssetNftContract(): ethers.Contract {
    const hexPrivateKey = config().hexPrivateKey;
    const defaultProvider = config().defaultProvider;

    if(!(hexPrivateKey && defaultProvider)) {
      throw new Error('HexPrivateKey or verifyingContract empty')
    }

    const provider = ethers.getDefaultProvider(defaultProvider);
    return new ethers.Contract(hexPrivateKey, CONTRACT_ABI, provider)
  }
}

