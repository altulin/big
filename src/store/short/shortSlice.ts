import { createSlice } from "@reduxjs/toolkit";

const shortSlice = createSlice({
  name: "short",

  initialState: {
    nomination: "",
  },

  reducers: {
    setShortNomination(state, action) {
      state.nomination = action.payload;
    },
  },
});

export const { setShortNomination } = shortSlice.actions;
export default shortSlice.reducer;
