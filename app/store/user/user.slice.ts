import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	updateWalletStatus: any,
	signatureData: {
		loading: boolean,
		data: any
	},
	updateNftStatus: any
}

const initialState: IState = {
	updateWalletStatus: null,
	signatureData: {
		loading: false,
		data: null
	},
	updateNftStatus: null
}

export const orderSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		updateWalletAddress: (state, action: PayloadAction<string>) => {
			state.updateWalletStatus = action.payload
		},
		getSignatureNFT: state => {
			state.signatureData.loading = true;
		},
		getSignatureNFT_Fail: (state, action: PayloadAction<string>) => {
			state.signatureData.loading = false;
		},
		getSignatureNFT_Success: (state, action: PayloadAction<string>) => {
			// state.signatureData.loading = false;
			state.signatureData.data = action.payload
		},
		resetSignatureData: (state) => {
			state.signatureData.loading = false;
			state.signatureData.data = null;
		},
		updateNftTransactionHash: (state, action: PayloadAction<any>) => {
			state.updateNftStatus = action.payload;
		}
	},
})

/**
 * Tự động tạo action từ hàm reducers
 */
export const {
	updateWalletAddress,
	getSignatureNFT,
	getSignatureNFT_Fail,
	getSignatureNFT_Success,
	resetSignatureData,
	updateNftTransactionHash
} = orderSlice.actions

export default orderSlice.reducer
