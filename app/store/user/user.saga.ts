import {call, put, takeLeading} from 'redux-saga/effects'
import {Action} from "redux";
import {
	updateWalletAddress,
	getSignatureNFT,
	getSignatureNFT_Fail,
	getSignatureNFT_Success,
	updateNftTransactionHash
} from './user.slice'
import {message as msg} from "antd";
import service from "../../service/user.service";

interface IAction extends Action {
	payload: any
}

function* updateWalletAddressWorker(action: IAction): any {
	const [response, error] = yield service.updateWalletAddress(action.payload)
	if (error) {
		msg.error(error.toString())
	} else {
		if (response.code !== 0) {
			const {message} = response
			msg.error(message)
		} else {
			const {data} = response
			const payload = data
			yield put({type: updateWalletAddress.toString(), payload})
		}
	}
}

function* getSignatureNFTWorker(action: IAction): any {
	if(!action.payload){
		return yield put({type: getSignatureNFT.toString()})
	}
	const [response, error] = yield service.getSignatureNFT(action.payload)
	if (error) {
		yield put({type: getSignatureNFT_Fail.toString()})
		return msg.error(error.toString())
	} else {
		if (response.code !== 0) {
			const {message} = response
			yield put({type: getSignatureNFT_Fail.toString()})
			return msg.error(message)
		} else {
			const {data} = response
			const payload = data
			yield put({type: getSignatureNFT_Success.toString(), payload})
		}
	}
}

function* updateNftTransactionHashWorker(action: IAction): any {
	const [response, error] = yield service.updateNftTransactionHash(action.payload)
	if (error) {
		return msg.error(error.toString())
	} else {
		if (response.code !== 0) {
			const {message} = response
			return msg.error(message)
		} else {
			const {data} = response
			const payload = data
			yield put({type: updateNftTransactionHash.toString(), payload})
		}
	}
}

function* userWatcher() {
	yield takeLeading(updateWalletAddress.toString(), updateWalletAddressWorker)
	yield takeLeading(getSignatureNFT.toString(), getSignatureNFTWorker)
	yield takeLeading(updateNftTransactionHash.toString(), updateNftTransactionHashWorker)
}

export default userWatcher
