import locationReducer from './locationReducer';
import { configureStore } from '@reduxjs/toolkit';

// store 설정 + reducer 합침
// `locationReducer`합침
export interface RootState {
  location: string; // coordinates로 사용하는 건지 확인
}

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
