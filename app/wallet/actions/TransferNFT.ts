import {message} from "antd";
import MetaMarkConnect from "../connector";
import {ethers} from "ethers";
import {config} from "../../../config";

/**
 * Transfer NFT
 */
export default class TransferNFT extends MetaMarkConnect {
  async execute( to: string, tokenId = '27') {
    try {
      const contract = await this.getSignerContract();
      const address = await this.getAddress();
      const nonce = await this.getNoneString(address)
      const signature = await this.signData(address, tokenId, address, nonce)

      if (contract) {
        const resultTransferNFT = await contract.safeTransferWithPermission(address, to, tokenId, nonce, signature);
        console.log({resultTransferNFT})
      }
    } catch (e){
      console.log({e})
      message.error('Failed to transfer ownership')
    }
  }

  /**
   * sign Data Transfer
   * @param address
   * @param tokenId
   * @param to
   * @param nonce
   */
  async signData(address: string, tokenId: string, to: string, nonce: string): Promise<any> {
    const hexPrivateKey = config().hexPrivateKey;
    const verifyingContract = config().verifyingContract;
    const chainID = config().chainID;

    if(!(hexPrivateKey && verifyingContract && chainID)) {
      throw new Error('HexPrivateKey or verifyingContract empty')
    }

    const wallet = new ethers.Wallet(hexPrivateKey);

    return await wallet._signTypedData(
      {
        name: 'IPEX',
        version: '1.0.0',
        chainId: chainID,
        verifyingContract: verifyingContract,
      },
      {
        Transfer: [
          {name: 'from', type: 'address'},
          {name: 'to', type: 'address'},
          {name: 'tokenId', type: 'uint256'},
          {name: 'nonce', type: 'uint256'},
        ],
      },
      {
        from: address,
        to,
        tokenId,
        nonce
      },
    );
  }
}
