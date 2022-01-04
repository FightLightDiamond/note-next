import '../styles/globals.css'
import type {AppProps} from 'next/app'
import store, {persistor} from "../app/store";
import {PersistGate} from 'redux-persist/integration/react'
import {createWrapper} from "next-redux-wrapper";
// import {useDispatch} from "react-redux";
// import {useEffect} from "react";
// import {wsConnect} from "../app/store/ws/ws.slice";
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({Component, pageProps}: AppProps) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(wsConnect(''))
  // }, [])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Web3ReactProvider>
  )
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
