import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface IInitialState {
  socket: any
}

const initialState: IInitialState = {
  socket: null
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    connect(state, action: PayloadAction<string>) {
      alert('Cn' + action.payload)
    },
    wsDisconnect(state, action: PayloadAction<string>) {
      alert('Ds' + action.payload)
    },
    wsDisconnected(state, action: PayloadAction<string>) {
      state.socket = null
      alert('Dst' + action.payload)
    }
  }
})

export const {
  wsDisconnect,
  wsDisconnected,
} = wsSlice.actions

export default wsSlice.reducer
