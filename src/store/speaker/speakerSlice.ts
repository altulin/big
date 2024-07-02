import { createSlice } from "@reduxjs/toolkit";

const speakerSlice = createSlice({
  name: "swiper",

  initialState: {
    speaker: null,
  },

  reducers: {
    setSpeaker(state, action) {
      state.speaker = action.payload;
    },
  },
});

export const { setSpeaker } = speakerSlice.actions;
export default speakerSlice.reducer;
