import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../app/store/chat/chat.slice";
import {
  getNewMessage,
  createConversation,
  joinConversation,
  leaveConversation,
  sentEvent, createRoom, joinRoom
} from "../app/store/chat/chat.sw";
// import {nftmarketaddress, nftaddress} from "../.config";
import {useWeb3React} from '@web3-react/core'
import MetaMarkConnect, {connectMetaMark} from "../app/wallet/connector";
import {ethers} from "ethers";
import {message} from "antd";
import CONTRACT_ABI from "../app/constants/abi/asset.json";
import MintNFT from "../app/wallet/actions/MintNFT";
import TransferNFT from "../app/wallet/actions/TransferNFT";
import Transaction from "../app/wallet/actions/Transaction";
// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
// import peerjs from "peerjs"

/**
 *
 * @constructor
 */
const Home: NextPage = () => {
  const dispatch = useDispatch();
  const {ethereum} = window as any;

  useEffect(() => {
    getNewMessage(dispatch)
  }, [])

  const {active, error, activate, account} = useWeb3React();
  console.log({active, error, activate, account})

  useEffect((): any => {
    const {ethereum} = window as any

    if(!ethereum) return

    const handleConnect = () => {
      console.log('%c handleConnect..............', 'background: #222; color: #bada55')
      handleWalletConnect()
    }
    const handleChainChanged = (chainId: string | number) => {
      console.log('%c handleChainChanged..............', 'background: #222; color: #bada55')
      handleWalletConnect()

    }
    const handleAccountsChanged = (accounts: string[]) => {
      console.log('%c handleAccountsChanged..............', 'background: #222; color: #bada55')

      if (accounts.length > 0) {
        handleWalletConnect()
      }
    }
    const handleNetworkChanged = (networkId: string | number) => {
      console.log("%c Handling 'networkChanged' event with payload", networkId)
      handleWalletConnect()
    }

    const handleDisconnect = () => {
      console.log('%c handleDisconnect..............', 'background: #222; color: #bada55')
      console.log("Disconnect");
      // dispatch(activeConnector(null));
    }

    ethereum.on('connect', handleConnect)
    ethereum.on('chainChanged', handleChainChanged)
    ethereum.on('accountsChanged', handleAccountsChanged)
    ethereum.on('networkChanged', handleNetworkChanged)
    ethereum.on('Web3ReactDeactivate', handleDisconnect)

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('connect', handleConnect)
        ethereum.removeListener('chainChanged', handleChainChanged)
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
        ethereum.removeListener('networkChanged', handleNetworkChanged)
        ethereum.removeListener('Web3ReactDeactivate', handleDisconnect)
      }
    }
  }, [active, error, activate, account])

  const [msg, setMsg] = useState('')

  /**
   * Connect metamark
   */
  const handleWalletConnect = async () => {
    try {
      await activate(connectMetaMark, (error: any) => {
        console.log({error})
      });
    } catch (err) {
      console.log({err});
    }
  }

  /**
   *
   * @param address
   * @param abi
   * @param signer
   */
  function getContract(address: string, abi: any, signer: any) {
    try {
      return new ethers.Contract(address, abi, signer);
    } catch {
      return null;
    }
  }

  /**
   * Min NFT
   * @param signatureResponse
   */
  const mintNFT = async (signatureResponse: {
    signature: any,
    nonce: string,
    to: string,
    tokenUri: string,
  }) => {
    try {
      // kiểm tra ethereum từ metamark
      if (!ethereum) return;
      await ethereum.send("eth_requestAccounts");
      //connect ethereum
      const provider = new ethers.providers.Web3Provider(ethereum);

      // ký giao dịch
      const signer = provider.getSigner();
      const address_account = await signer.getAddress();
      const contract = await getContract('ADDRESS_CONTRACT', CONTRACT_ABI, signer);

      if (signatureResponse && contract) {
        const {nonce, signature, tokenUri} = signatureResponse;
        const resultMintNFT = await contract.issueAssetByInvestor(address_account, tokenUri, nonce, signature);

        if (resultMintNFT) {
          console.log('resultMintNFT', resultMintNFT)
          const {hash} = resultMintNFT;
        }
      }
    } catch {
      message.error('Failed to mint NFT')
    }
  }

  const splitSignature = async () => {
    try {

      const {ethereum} = window as any
      if (!ethereum) return message.error('Network failed');
      await ethereum.send("eth_requestAccounts");
      // Liên kết metamark
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Ký giao dịch
      const signer = provider.getSigner();
      const signature = await signer.signMessage('MINT_NFT');
      const address = await signer.getAddress();
      const splitSignature = ethers.utils.splitSignature(signature);
      console.log('signatureData request from wallet', splitSignature)

      if (splitSignature) {
        // await mintNFT(responseSignature.data);
      } else {
        throw new Error();
      }
    } catch {
      message.error('Failed to verify signature')
    }
  }

  const getAssetNftContract = (): ethers.Contract => {
    const provider = ethers.getDefaultProvider('https://goerli.infura.io/v3/710b741fe9924cc8a5fa4fa20a89e620');
    return new ethers.Contract('0x9a6a99D57209385f0FcE2e7efAFD7DDA9c808297', CONTRACT_ABI, provider)
  }

  const onFinish = async (values: any) => {
    try {
      const {ethereum} = window as any
      if (!ethereum) return;
      await ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage('TRANSFER_NFT');
      const address = await signer.getAddress();

      const signatureData = ethers.utils.splitSignature(signature);
      console.log('signatureData', signatureData)
      if (signatureData) {

      }
    } catch {
      message.error('Failed to verify signature');
    }
  };

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.container} id="abc" ref={ref}>
      <input type="text" onChange={
        (e) => setMsg(e.target.value)
      }/>

      <button onClick={() => {
        dispatch(sendMessage(msg))
      }}>Send </button>

      <button onClick={sentEvent}>sentEvent</button>
      <button onClick={createRoom}>createRoom</button>
      <button onClick={joinRoom}>joinRoom</button>
      <button onClick={() => createConversation({
        id: 2
      })}>createConversation
      </button>
      <button onClick={() => joinConversation(7199)}>joinConversation</button>
      <button onClick={() => leaveConversation()}>leaveConversation</button>
      <button onClick={() => leaveConversation()}>leaveConversation</button>
      <button onClick={() => handleWalletConnect()}>handleWalletConnect</button>
      <button onClick={async () => {
        const metaMark = new MetaMarkConnect(ethereum)
        const address = await metaMark.getAddress()
        alert(address)
      }}>getAddress</button>

      <button onClick={async () => {
        const metaMark = new MetaMarkConnect(ethereum)
        const contract = await metaMark.getSignerContract()
        console.log({contract})
        alert(contract)
      }}>get Contract</button>

      <button onClick={async () => {
        const metaMark = new MintNFT(ethereum)
        const address = await metaMark.getAddress()
        const res = await metaMark.execute(address)
        console.log({res})
        alert('0k')
      }}>Mint NFT</button>

      <button onClick={async () => {
        console.log({ethereum})
        const transferNFT = new TransferNFT(ethereum)
        const res = await transferNFT.execute('0x5d214F695c2D9ccF94293aF8CD766Cb1d40642c3')
        console.log({res})
      }}>Transfer NFT</button>

      <button onClick={async () => {
        const transferNFT = new Transaction(ethereum)
        const res = await transferNFT.execute()
        console.log({res})
      }}>Transaction NFT</button>

      <button onClick={async () => {
        // htmlToImage.toPng(document.getElementById('abc'))
        //   .then(function (dataUrl) {
        //     var img = new Image();
        //     img.src = dataUrl;
        //     document.body.appendChild(img);
        //   });

        // htmlToImage.toBlob(document.getElementById('abc'))
        //   .then(function (blob) {
        //     window.saveAs(blob, 'my-node.png');
        //   });

        // toJpeg(ref.current, { cacheBust: true, })
        //   .then((dataUrl) => {
        //     console.log({dataUrl})
        //     const link = document.createElement('a')
        //     link.download = 'my-image-name.png'
        //     link.href = dataUrl
        //     link.click()
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
      }}>Generate Image</button>
    </div>
  )
}

export default Home
