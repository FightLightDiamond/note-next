import {io} from "socket.io-client";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImExQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTYzOTEwNDU5MywiZXhwIjoxNjM5MTkwOTkzfQ.wKfi_b4t2bTHBLHALCVCpgXEjqlBvKJayDXtXywK4v4"
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
