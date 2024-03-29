import { createSlice } from '@reduxjs/toolkit';

// 현재 위치 주소 정보를 받아 store에 위치 업데이트
const initialState = '';

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    updateLocation: (_state, action) => {
      return action.payload;
    },
  },
});

export const { updateLocation } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
