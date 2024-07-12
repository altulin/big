import { createSlice } from "@reduxjs/toolkit";

const formsSlice = createSlice({
  name: "forms",

  initialState: {
    forms: [""],
  },

  reducers: {
    setAddForm(state) {
      state.forms = state.forms.concat([""]);
    },

    setRemoveForm(state) {
      state.forms = state.forms.slice(0, -1);
    },
  },
});

export const { setAddForm, setRemoveForm } = formsSlice.actions;
export default formsSlice.reducer;
