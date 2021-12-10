import '../styles/globals.css'
import type {AppProps} from 'next/app'
import store, {persistor} from "../app/store";
import {PersistGate} from 'redux-persist/integration/react'
import {createWrapper} from "next-redux-wrapper";
// import {useDispatch} from "react-redux";
// import {useEffect} from "react";
// import {wsConnect} from "../app/store/ws/ws.slice";

function MyApp({Component, pageProps}: AppProps) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(wsConnect(''))
  // }, [])
  return <PersistGate loading={null} persistor={persistor}>
    <Component {...pageProps} />
  </PersistGate>
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
