import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../app/store/chat/chat.slice";
import {getNewMessage, createConversation, joinConversation, leaveConversation} from "../app/store/chat/chat.sw";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  useEffect( () => {
      getNewMessage(dispatch)
  }, [])

  const [message, setMessage] = useState('')

  return (
    <div className={styles.container}>
      <input type="text" onChange={
        (e) => setMessage(e.target.value)
      }/>
     <button onClick={() => {
      dispatch(sendMessage(message))
     }}>Send</button>
     <button onClick={() => createConversation({
       id: 1
     })}>createConversation</button>
     <button onClick={() => joinConversation(1)}>joinConversation</button>
     <button onClick={() => leaveConversation()}>leaveConversation</button>
     <button onClick={() => leaveConversation()}>leaveConversation</button>
    </div>
  )
}

export default Home
