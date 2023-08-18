import { createStore, combineReducers, Store } from 'redux';
import locationReducer from './locationReducer';

// store 설정 + reducer 합침
// `locationReducer`합침
export interface RootState {
  location: string; // coordinates로 사용하는 건지 확인
}

const rootReducer = combineReducers({
  location: locationReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;
