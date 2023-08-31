import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, Store } from '@to1step/propose-backend';

interface SearchState {
  searchResultsCourse: Course[]; // 검색 결과 데이터 저장
  searchResultsStore: Store[];
  searchQuery: string;
}

const initialState: SearchState = {
  searchResultsCourse: [], // Course 타입의 배열을 빈 배열로 초기화
  searchResultsStore: [],
  searchQuery: '', // 검색어이기 때문에 빈 문자열로 초기화
};

const searchSlice = createSlice({
  name: 'search', // 액션 타입 생성에 사용될 슬라이스 이름 설정
  initialState,
  reducers: {
    setSearchResultsCourse: (state, action: PayloadAction<Course[]>) => {
      // 액션(PayloadAction<Course[]>타입)을 처리해 상태 업데이트
      state.searchResultsCourse = action.payload; // 검색 결과 데이터 상태 업데이트
    },
    setSearchResultsStore: (state, action: PayloadAction<Store[]>) => {
      // 액션(PayloadAction<Store[]>타입)을 처리해 상태 업데이트
      state.searchResultsStore = action.payload; // 검색 결과 데이터 상태 업데이트
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload; // 검색어 업데이트
    },
  },
});

export const { setSearchResultsCourse, setSearchResultsStore, setSearchQuery } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
