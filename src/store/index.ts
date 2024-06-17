import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";

import { emptyApi } from "./rtk/emptyApi";
import { rtkQueryErrorLogger } from "./errorLogger";
import menuSlice from "./menu/menuSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    menu: menuSlice,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([emptyApi.middleware, rtkQueryErrorLogger]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
