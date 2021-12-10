import {put, takeLeading} from "redux-saga/effects";
import {
  wsDisconnect,
  wsDisconnected,
} from "./ws.slice";
import {Action} from "redux";
import {io} from "socket.io-client";
import Cookies from "js-cookie";
interface IAction extends Action {
  payload: any
}

function* connectWorker(action: IAction): any {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImExQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTYzOTEwNDU5MywiZXhwIjoxNjM5MTkwOTkzfQ.wKfi_b4t2bTHBLHALCVCpgXEjqlBvKJayDXtXywK4v4"
  const socket = io("http://localhost:4000", {
    query: { token },
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `${token}`
        }
      }
    }
  });
}

function* disconnectWorker(action: IAction): any {
  const {socket}: any = action
  socket.close()
  socket.on("disconnect", () => {
    put({ type: wsDisconnected.type, socket})
  });
}

function* wsWatcher(): any {
  yield takeLeading(wsDisconnect.type, disconnectWorker)
}

export default wsWatcher
