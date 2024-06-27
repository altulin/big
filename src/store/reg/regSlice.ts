import { createSlice } from "@reduxjs/toolkit";

const regSlice = createSlice({
  name: "menu",

  initialState: {
    status: "individual",
  },

  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = regSlice.actions;
export default regSlice.reducer;
