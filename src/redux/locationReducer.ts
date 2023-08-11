import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// reduxjs/toolkit의 Slice, `updateLocation` 액션으로 `location` 상태를 업데이트
const locationSlice = createSlice({
  name: 'location',
  initialState: {
    location: '',
  },
  reducers: {
    updateLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
