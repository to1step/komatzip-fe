import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, Store } from '@to1step/propose-backend';

interface SearchState {
  searchResults: (Course | Store)[]; // 검색 결과 데이터 저장
  searchQuery: string;
}

const initialState: SearchState = {
  searchResults: [], // StoreEntireInfo 타입의 배열을 빈 배열로 초기화
  searchQuery: '', // 검색어이기 때문에 빈 문자열로 초기화
};

const searchSlice = createSlice({
  name: 'search', // 액션 타입 생성에 사용될 슬라이스 이름 설정
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<(Course | Store)[]>) => {
      // 액션(PayloadAction<(Course | Store)[]>타입)을 처리해 상태 업데이트
      state.searchResults = action.payload; // 검색 결과 데이터 상태 업데이트
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload; // 검색어 업데이트
    },
  },
});

export const { setSearchResults, setSearchQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
