import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from "js-cookie";
import {TYPE_LOGIN} from "../../constants";

interface IState {
	signInLoading: boolean,
	signInError: boolean,
	is2FAModal: boolean,
	signIn2FALoading: boolean,
	signIn2FAError: boolean,
	user: any,
	accessToken?: string,
	isAuthentication: boolean,
	typeLogin: number
}

const initialState: IState = {
	signInLoading: false,
	signInError: false,
	is2FAModal: false,
	signIn2FALoading: false,
	signIn2FAError: false,
	user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') + '') : null,
	accessToken: Cookies.get('accessToken'),
	isAuthentication: !!Cookies.get('userInfo'),
	typeLogin: TYPE_LOGIN.email
}

interface ISignInSuccessData {
	twoFactor: boolean,
}

interface ISignIn2FASuccessData {

}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<string>) => {
			state.signInLoading = true
			state.signInError = false
		},
		signInSuccess: (state, action: PayloadAction<ISignInSuccessData>) => {
			state.signInLoading = false
			state.typeLogin = action.payload.twoFactor ? TYPE_LOGIN.google : TYPE_LOGIN.email
			state.is2FAModal = true
		},
		signInFail: (state) => {
			state.signInLoading = false
			state.isAuthentication = false
			state.signInError = true
		},
		signIn2FA: (state, action: PayloadAction<string>) => {
			state.signIn2FALoading = true
			state.signIn2FAError = false
		},
		signIn2FASuccess: (state, action: PayloadAction<ISignIn2FASuccessData>) => {
			state.signIn2FALoading = false
			state.isAuthentication = true
			state.is2FAModal = false
		},
		signIn2FAFail: (state) => {
			state.signIn2FALoading = false
			state.isAuthentication = false
			state.signIn2FAError = true
			state.is2FAModal = false
		},
		setIs2FAModal: (state, action) => {
			state.is2FAModal = action.payload
		},
		setTypeLogin: (state, action) => {
			state.typeLogin = action.payload
		},
	},
})

export const {
	signIn,
	signInSuccess,
	signInFail,
	signIn2FA,
	signIn2FASuccess,
	signIn2FAFail,
	setIs2FAModal,
	setTypeLogin
} = authSlice.actions

export default authSlice.reducer
