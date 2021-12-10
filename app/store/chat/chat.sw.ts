import {sendMessageSuccess} from "./chat.slice";
import {socket} from "../ws";
import {Message} from "../../models/Message";
import {User} from "../../models/user.model";

const createConversation = (friend: User): void => {
  socket.emit('createConversation', friend);
}

const joinConversation = (friendId: number): void => {
  socket.emit('joinConversation', friendId);
}

const leaveConversation = (): void => {
  socket.emit('leaveConversation');
}

/**
 * Sent Message
 * @param message
 */
const sentMessage = (message: string) => {
  const newMessage: Message = {
    message,
    conversation: {
      id: 1
    },
  };
  socket.emit('sentMessage', newMessage)
}

/**
 * Get New Message
 * @param dispatch
 */
const getNewMessage = (dispatch: any) => {
  socket.on('newMessage', (newMessage: string) => {
    dispatch(sendMessageSuccess(newMessage))
  })
  socket.on('messages', (res) => {
    console.log('messages', res)
  })
  socket.on('conversations', (res) => {
    console.log('conversations', res)
  })
  socket.on('401', (res) => {
    alert(res)
  })
  socket.on('some event', (res) => {
    alert(res)
  })
}



export {getNewMessage, sentMessage, createConversation, joinConversation, leaveConversation}
