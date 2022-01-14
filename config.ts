export const config = () => {
  return {
    chainID: process.env.NEXT_PUBLIC_CHAIN_ID || '5',
    hexPrivateKey: process.env.NEXT_PUBLIC_HEX_PRIVATE_KEY || '54516da687bfa7ba7c115d3ed3155a099e0b40f89560a9e3dfb4d34ab1d61579',
    verifyingContract: process.env.NEXT_PUBLIC_VERIFYING_CONTRACT || '0x9a6a99D57209385f0FcE2e7efAFD7DDA9c808297',
    addressContract: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT || '0x9a6a99D57209385f0FcE2e7efAFD7DDA9c808297',
    defaultProvider: process.env.NEXT_PUBLIC_PROVIDER_URL,
    tokenUri: process.env.NEXT_PUBLIC_TOKEN_URI,
  }
}
