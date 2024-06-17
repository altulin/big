import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",

  initialState: {
    isMenu: false,
  },

  reducers: {
    setMenuControl(state, action) {
      const body = document.body;
      action.payload
        ? body.classList.add("body--menu")
        : body.classList.remove("body--menu");

      state.isMenu = action.payload;
    },
  },
});

export const { setMenuControl } = menuSlice.actions;
export default menuSlice.reducer;
