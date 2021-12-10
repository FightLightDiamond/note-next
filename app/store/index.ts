import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from "./rootSaga";
import createSagaMiddleware from "@redux-saga/core";

const initialState = {};
/**
 * Saga Middleware
 */
const sagaMiddleware = createSagaMiddleware()

const middlewares = [thunk, sagaMiddleware];

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['connector']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, initialState, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

store.subscribe(() => {
	console.log('store', store.getState())
})

sagaMiddleware.run(rootSaga)

export default store;

