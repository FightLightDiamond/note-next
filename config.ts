export const config = () => {
  return {
    chainID: process.env.NEXT_PUBLIC_CHAIN_ID || '5',
    hexPrivateKey: process.env.NEXT_PUBLIC_HEX_PRIVATE_KEY,
    verifyingContract: process.env.NEXT_PUBLIC_VERIFYING_CONTRACT,
    defaultProvider: process.env.NEXT_PUBLIC_PROVIDER_URL,
    tokenUri: process.env.NEXT_PUBLIC_TOKEN_URI,
  }
}
