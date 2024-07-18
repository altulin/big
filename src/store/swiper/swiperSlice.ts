import { createSlice } from "@reduxjs/toolkit";

const swiperSlice = createSlice({
  name: "swiper",

  initialState: {
    progress: null,
    slides: [],
  },

  reducers: {
    setSwiperProgress(state, action) {
      state.progress = action.payload;
    },
    setSwiperSlides(state, action) {
      state.slides = action.payload;
    },
  },
});

export const { setSwiperProgress, setSwiperSlides } = swiperSlice.actions;
export default swiperSlice.reducer;
