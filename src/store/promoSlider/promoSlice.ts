import { createSlice } from "@reduxjs/toolkit";

const promoSlice = createSlice({
  name: "promoSlider",

  initialState: {
    slide: 0,
  },

  reducers: {
    setPromoSlide(state, action) {
      state.slide = action.payload;
    },
  },
});

export const { setPromoSlide } = promoSlice.actions;
export default promoSlice.reducer;
