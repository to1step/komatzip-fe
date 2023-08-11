import { createSlice } from "@reduxjs/toolkit";

const initialState = ''; // 초기 값 설정

// 현재 위치 주소 정보를 받아 store에 위치 업데이트
const updateLocation = createSlice({
  name: 'location',
  initialState : initialState,
  reducers: {
    updateLocation: (state, action) => {
      return action.payload;
    }
  }
})

export updateLocation;
