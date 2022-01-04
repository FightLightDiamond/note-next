import {io} from "socket.io-client";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImExQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NDAzNDEwMjAsImV4cCI6MTY0MDQyNzQyMH0.Cr_MsrfVVhkVbnX-hkfI2WsntNQm8YT-GoSyqQqrmWc"
const socket = io("http://localhost:4000", {
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

export {socket}
