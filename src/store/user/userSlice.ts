import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    dataMe: {
      phone_number: null,
      name: null,
      email: "user@example.com",
      password: null,
      type: "individual",
      company_name: null,
      company_details_file: null,
      id: null,
      is_jury: false,
      votes_amount: 0,
      works_amount: 0,
    },
  },
  reducers: {
    setUserData(state, action) {
      state.dataMe = {
        ...action.payload,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
