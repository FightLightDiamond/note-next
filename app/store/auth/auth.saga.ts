import {put, takeLeading} from 'redux-saga/effects'
import {Action} from "redux";
import {
	signIn,
	signInSuccess,
	signInFail,
	signIn2FA,
	signIn2FASuccess,
	signIn2FAFail,
} from './auth.slice'
import {message as msg} from "antd";
import authService from "../../service/authService";
import Cookies from "js-cookie";

interface IAction extends Action {
	payload: any
}

function* signInWorker(action: IAction): any {
	const [response, error] = yield authService.signIn(action.payload)
	if (error) {
		msg.error(error.toString())
		yield put({type: signInFail.toString()})
	} else {
		if (response.code !== 0) {
			const {message} = response
			yield put({type: signInFail.toString(), message})
			msg.error(message)
		} else {
			const {data} = response
			const payload = data
			yield put({type: signInSuccess.toString(), payload})
			const { twoFactor } = response.data
			Cookies.set('twoFactor', twoFactor)
		}
	}
}

function* signIn2FAWorker(action: IAction): any {
	const {payload} = action
	const {body, router} = payload
	const [response, error] = yield authService.signIn2FA(body)
	if (error) {
		msg.error(error.toString())
		yield put({type: signIn2FAFail.toString()})
	} else {
		if (response.code !== 0) {
			const {message} = response
			yield put({type: signIn2FAFail.toString(), message})
			msg.error(message)
		} else {
			const {data} = response
			const payload = data
			yield put({type: signIn2FASuccess.toString(), payload})
			const { token } = response.data;
			Cookies.set('accessToken', token)
			msg.success('Sign in successfully')
			router.push('/')
		}
	}
}

function* authWatcher() {
	yield takeLeading(signIn.toString(), signInWorker)
	yield takeLeading(signIn2FA.toString(), signIn2FAWorker)
}

export default authWatcher
