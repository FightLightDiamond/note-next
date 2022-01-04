import {
	useSelector as useReduxSelector,
	TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '../store/reducers';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;