import MetaMarkConnect from "../connector";
export const MINTING_NFT = 1
export const TRANSFER = 2

export default class Transaction extends MetaMarkConnect {
  async execute() {
    const fromBlock = Number(0)
    const assetContract = this.getAssetNftContract();
    const filterTo = assetContract.filters['Transfer']();
    const events = await assetContract.queryFilter(filterTo, fromBlock);

    console.log({events})

    const listHash = events.map((event: any) => event?.transactionHash);
    const transactions = events.map((event: any) => {
     return {
       transactionHash: event.transactionHash,
       from: event.args?.['from'],
       to: event.args?.['to'],
       tokenId: event.args?.['tokenId'].toString(),
       blockNumber: event?.blockNumber,
       type: event?.args?.['from'] === '0x0000000000000000000000000000000000000000' ? MINTING_NFT : TRANSFER,
     }
    });

    console.log({listHash})
    console.log({transactions})
  }
}
