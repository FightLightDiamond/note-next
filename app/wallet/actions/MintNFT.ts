import MetaMarkConnect from "../connector";
import {ethers} from "ethers";
import {config} from "../../../config";

/**
 * mint NFT
 */
export default class MintNFT extends MetaMarkConnect {
  /**
   * execute
   * @param to
   */
  async execute (to: string) {
    const address = await this.getAddress();
    const contract = await this.getSignerContract()
    const tokenUri = this.getTokenUri('1')
    const nonce = await this.getNoneString(address)
    const signature = await this.signData(nonce, tokenUri, to)

    console.log({address, contract, tokenUri, nonce, signature})

    if (contract) {
      const resultMintNFT = await contract.issueAssetByInvestor(address, tokenUri, nonce, signature);

      console.log(resultMintNFT)

      if (resultMintNFT) {
        const {hash} = resultMintNFT;
      }

      return resultMintNFT
    }
    return {
      signature
    }
  }

  /**
   * get Sign Mint
   */
  async signData(nonce: string, tokenUri: string, to: string) {
    const hexPrivateKey = config().hexPrivateKey;
    const verifyingContract = config().verifyingContract;
    const chainID = config().chainID;

    if(!(hexPrivateKey && verifyingContract && chainID)) {
      throw new Error('HexPrivateKey or verifyingContract empty')
    }

    const wallet = new ethers.Wallet(hexPrivateKey);
    return await wallet._signTypedData(
      // Domain
      {
        name: 'IPEX',
        version: '1.0.0',
        chainId: chainID,
        verifyingContract: verifyingContract,
      },
      {
        Mint: [
          {name: 'to', type: 'address'},
          {name: 'tokenURI', type: 'string'},
          {name: 'nonce', type: 'uint256'}
        ]
      },
      {
        to: to,
        tokenURI: tokenUri,
        nonce: nonce,
      }
    )
  }
}
