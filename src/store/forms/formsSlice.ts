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
    setClearForm(state) {
      state.forms = [""];
    },
  },
});

export const { setAddForm, setRemoveForm, setClearForm } = formsSlice.actions;
export default formsSlice.reducer;
