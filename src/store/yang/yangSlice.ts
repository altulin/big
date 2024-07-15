import { createSlice } from "@reduxjs/toolkit";

const yangSlice = createSlice({
  name: "swiper",

  initialState: {
    isYang: false,
  },

  reducers: {
    setYang(state, action) {
      state.isYang = action.payload;
    },
  },
});

export const { setYang } = yangSlice.actions;
export default yangSlice.reducer;
