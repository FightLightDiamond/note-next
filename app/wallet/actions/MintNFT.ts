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
    // const address = await this.getAddress();
    // console.log({address})
    console.log({to})
    const contract = await this.getSignerContract()
    console.log({contract})
    const tokenUri = this.getTokenUri('xxx')
    console.log({tokenUri})
    const nonce = await this.getNoneString(to)
    console.log({nonce})
    const signature = await this.signData(nonce, tokenUri, to)

    // console.log({address, contract, tokenUri, nonce, signature})

    if (contract) {
      const resultMintNFT = await contract.issueAssetByInvestor(to, tokenUri, nonce, signature);

      console.log({resultMintNFT})

      if (resultMintNFT) {
        const {hash} = resultMintNFT;
      }

      return resultMintNFT
    }
    return '0k'
  }

  /**
   * get Sign Mint
   */
  async signData(nonce: string, tokenUri: string, to: string) {
    const hexPrivateKey: string = config().hexPrivateKey;
    const addressContract: string = config().addressContract;
    console.log({addressContract, hexPrivateKey})
    const chainID = config().chainID;

    if(!(hexPrivateKey && addressContract && chainID)) {
      throw new Error('HexPrivateKey or verifyingContract empty')
    }

    const wallet = new ethers.Wallet(hexPrivateKey);
    return await wallet._signTypedData(
      // Domain
      {
        name: 'IPEX',
        version: '1.0.0',
        chainId: chainID,
        verifyingContract: addressContract, //0x9a6a99D57209385f0FcE2e7efAFD7DDA9c808297
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
