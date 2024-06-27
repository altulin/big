import { paths } from "@/service/paths";
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",

  initialState: {
    isMenu: false,
    path: paths.promo,
    isClick: false,
  },

  reducers: {
    setMenuControl(state, action) {
      const body = document.body;
      action.payload
        ? body.classList.add("body--menu")
        : body.classList.remove("body--menu");

      state.isMenu = action.payload;
    },

    setPath(state, action) {
      state.path = action.payload;
    },

    setClick(state, action) {
      state.isClick = action.payload;
    },
  },
});

export const { setMenuControl, setPath, setClick } = menuSlice.actions;
export default menuSlice.reducer;
