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

const createRoom = (): void => {
  socket.emit('createRoom');
}

const joinRoom = (): void => {
  socket.off('/chat').emit('joinRoom');
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
  socket.on('cronSW', (res) => {
    console.log('cronSW', res)
  })
  socket.on('room', (res) => {
    console.log('room', res)
  })
  socket.on('roomq', (res) => {
    console.log('roomq', res)
  })
  socket.off('chat').on('pingROm', (res) => {
    alert('chat pingROm')
  })
  socket.on('pingROm', (res) => {
    alert('pingROm')
  })
  socket.on('events', (res) => {
    console.log('events', res)
  })
}

/**
 * Sent Event
 */
const sentEvent = () => {
  socket.emit('events', { name: 'Nest' }, (response: any) => {
    console.log('events', response)
  });
  socket.emit('identity', 0, (response: any) =>
    console.log('Identity:', response),
  );
}

export {
  getNewMessage, sentMessage, createConversation, joinConversation,
  leaveConversation, sentEvent, createRoom, joinRoom
}
