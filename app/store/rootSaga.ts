import { all } from 'redux-saga/effects';
import authWatcher from '../store/auth/auth.saga';
import userWatcher from "./user/user.saga";
import chatWatcher from "./chat/chat.saga";
import wsWatcher from "./ws/ws.saga";

export default function* rootSaga() {
  yield all([
	  authWatcher(),
	  userWatcher(),
    chatWatcher(),
    wsWatcher(),
  ]);
}
