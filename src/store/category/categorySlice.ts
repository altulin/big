import { categories, categoriesPitshes } from "@/components/Pass/script";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "menu",

  initialState: {
    category: categories.only_tickets as string,
    categoryPitch: null as string | null,
  },

  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      // у бренд-питчей всегда должен быть выбран тип, у остальных категорий его нет
      state.categoryPitch =
        action.payload === categories.brand_pitches
          ? state.categoryPitch ?? categoriesPitshes.nuum
          : null;
    },

    setCategoryPitch(state, action) {
      state.categoryPitch = action.payload;
    },
  },
});

export const { setCategory, setCategoryPitch } = categorySlice.actions;
export default categorySlice.reducer;
