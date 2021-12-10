import {takeEvery} from "redux-saga/effects";
import {sendMessage} from "./chat.slice";
import {Action} from "redux";

import {sentMessage} from './chat.sw'

interface IAction extends Action {
  payload: any
}

/**
 * Send Worker
 * @param action
 */
function* sendWorker(action: IAction): any {
  sentMessage(action.payload)
}

/**
 * Chat Watcher
 */
function* chatWatcher() {
  yield takeEvery(sendMessage.type, sendWorker)
}


export default chatWatcher
