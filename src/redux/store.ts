import { createStore, combineReducers, Store } from 'redux';
import locationReducer from './locationReducer';

export interface RootState {
  location: string; // location 상태 타입 확인
}

const rootReducer = combineReducers({
  location: locationReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;
