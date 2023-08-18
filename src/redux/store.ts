import { createStore, combineReducers, Store } from 'redux';
import locationReducer from './locationReducer';
import { Store } from '@to1step/propose-backend';

// store 설정 + reducer 합침
// `locationReducer`합침
export interface RootState {
  location: string; // location 상태 타입 확인
  store: Store;
}

const rootReducer = combineReducers({
  location: locationReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;
