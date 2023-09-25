import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserMyInfo {
  email: string;
  nickname: string;
  provider: string;
  profileImage: string;
  commentAlarm: boolean;
  updateAlarm: boolean;
}
// 초기 상태 타입
export type UserState = {
  isLoggedIn: boolean;
  userData: UserMyInfo | null;
};

// 초기 상태
const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};

// 리듀서 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction(state: UserState, action: PayloadAction<UserMyInfo>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutAction(state: UserState) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

// 리듀서 & 액션 리턴
export const { loginAction, logoutAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
