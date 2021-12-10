import { combineReducers } from "redux";
import { IAction } from '../IAction';
import authReducer from '../auth/auth.slice';
import userReducer from '../user/user.slice';
import chatReducer from '../chat/chat.slice';
import wsReducer from '../ws/ws.slice';

const appReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	chat: chatReducer,
	ws: wsReducer,
})

const rootReducer = (state: any, action: IAction<any>) => {
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
