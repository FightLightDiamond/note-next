import {io} from "socket.io-client";
// import {User} from "../../models/user.model";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImExQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTY0MzcwOTQ4MywiZXhwIjoxNjQzNzk1ODgzfQ.5m0F_lrjHrFy7ZCSDDqw9SG55l33YyT0hp0yqvDLjA0"
const socket = io("http://localhost:4000/chat", {
  path: '/websockets',
  query: { token },
  // extraHeaders: {
  //   Authorization: `${token}`
  // },
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `${token}`
      }
    }
  }
  // transports: ['polling', 'websocket']
});

const alertSocket = io("http://localhost:4000/alert", {
  path: '/websockets',
  query: { token },
  // extraHeaders: {
  //   Authorization: `${token}`
  // },
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `${token}`
      }
    }
  }
  // transports: ['polling', 'websocket']
});

export {socket, alertSocket}
