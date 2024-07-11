import { createSlice } from "@reduxjs/toolkit";

const formsSlice = createSlice({
  name: "menu",

  initialState: {
    forms: [{ id: 0, data: {} }],
  },

  reducers: {
    setAddForm(state) {
      const index = Math.max(...state.forms.map((item) => item.id));
      state.forms = state.forms.concat({ id: index + 1, data: {} });
    },

    setRemoveForm(state, action) {
      // console.log(
      //   state.forms.filter((item) => {
      //     console.log(typeof item.id, typeof action.payload);
      //     item.id === action.payload;
      //   }),
      // );
      // console.log(
      //   state.forms.filter((item) => item.id === Number(action.payload)),
      // );
      state.forms = state.forms.filter(
        (item) => item.id !== Number(action.payload),
      );
    },
  },
});

export const { setAddForm, setRemoveForm } = formsSlice.actions;
export default formsSlice.reducer;
