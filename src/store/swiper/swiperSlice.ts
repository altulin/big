import { createSlice } from "@reduxjs/toolkit";

const swiperSlice = createSlice({
  name: "swiper",

  initialState: {
    progress: null,
  },

  reducers: {
    setSwiperProgress(state, action) {
      state.progress = action.payload;
    },
  },
});

export const { setSwiperProgress } = swiperSlice.actions;
export default swiperSlice.reducer;
