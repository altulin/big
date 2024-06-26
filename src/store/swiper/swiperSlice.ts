import { createSlice } from "@reduxjs/toolkit";

const swiperSlice = createSlice({
  name: "swiper",

  initialState: {
    swiper: null,
  },

  reducers: {
    setSwiper(state, action) {
      state.swiper = action.payload;
    },
  },
});

export const { setSwiper } = swiperSlice.actions;
export default swiperSlice.reducer;
