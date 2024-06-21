import { createSlice } from "@reduxjs/toolkit";

const programSlice = createSlice({
  name: "program",
  initialState: {
    current: null,
  },

  reducers: {
    setProgramItem(state, action) {
      state.current = action.payload;
    },
  },
});

export const { setProgramItem } = programSlice.actions;
export default programSlice.reducer;
