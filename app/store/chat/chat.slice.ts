import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: any = {}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<string>) {
      return state;
    },
    sendMessageSuccess(state, action: PayloadAction<string>) {
     alert('Msg: ' + action.payload)
    }
  }
})

export const {
  sendMessage,
  sendMessageSuccess
} = chatSlice.actions

export default chatSlice.reducer
