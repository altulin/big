import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalState, initialState } from "./initialState";

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    stepTo(state, action: PayloadAction<IModalState>) {
      state.modalState = action.payload;
    },

    clearAllStep(state) {
      state.modalState = null;
    },

    setErrorModal(state, action: PayloadAction<string>) {
      state.modalState = { error: { text: action.payload } };
    },

    setSuccessModal(
      state,
      action: PayloadAction<{ text: string; comein: boolean }>,
    ) {
      state.modalState = {
        success: { text: action.payload.text, comein: action.payload.comein },
      };
    },
  },
});

export const { stepTo, clearAllStep, setErrorModal, setSuccessModal } =
  modalSlice.actions;
export default modalSlice.reducer;
