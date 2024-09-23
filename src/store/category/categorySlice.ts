import { categories } from "@/components/Pass/script";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "menu",

  initialState: {
    category: categories.only_tickets,
    categoryPitch: null,
  },

  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },

    setCategoryPitch(state, action) {
      state.categoryPitch = action.payload;
    },
  },
});

export const { setCategory, setCategoryPitch } = categorySlice.actions;
export default categorySlice.reducer;
