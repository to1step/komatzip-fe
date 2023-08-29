import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreEntireInfo, CourseEntireInfo } from '@to1step/propose-backend';

interface SearchState {
  searchResults: (CourseEntireInfo | StoreEntireInfo)[]; // 검색 결과 데이터 저장
}

const initialState: SearchState = {
  searchResults: [], // StoreEntireInfo 타입의 배열을 빈 배열로 초기화
};

const searchSlice = createSlice({
  name: 'search', // 액션 타입 생성에 사용될 슬라이스 이름 설정
  initialState,
  reducers: {
    setSearchResults: (
      state,
      action: PayloadAction<(CourseEntireInfo | StoreEntireInfo)[]>,
    ) => {
      // 액션(PayloadAction<(CourseEntireInfo | StoreEntireInfo)[]>타입)을 처리해 상태 업데이트
      state.searchResults = action.payload; // 검색 결과 데이터 상태 업데이트
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
