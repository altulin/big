import { createSlice } from "@reduxjs/toolkit";

const passSlice = createSlice({
  name: "menu",

  initialState: {
    tickets_amount: 0,
    works_amount: 1,
  },

  reducers: {
    setTicketsAmount(state, action) {
      state.tickets_amount = action.payload;
    },

    setWorksAmount(state, action) {
      state.works_amount = action.payload;
    },
  },
});

export const { setTicketsAmount, setWorksAmount } = passSlice.actions;
export default passSlice.reducer;
