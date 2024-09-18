import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";
import { api } from "./rtk/emptyApi";
import { rtkQueryErrorLogger } from "./errorLogger";
import menuSlice from "./menu/menuSlice";
import programSlice from "./program/programSlice";
import regSlice from "./reg/regSlice";
import swiperSlice from "./swiper/swiperSlice";
import speakerSlice from "./speaker/speakerSlice";
import categorySlice from "./category/categorySlice";
import userSlice from "./user/userSlice";
import passSlice from "./pass/passSlice";
import formsSlice from "./forms/formsSlice";
import yangSlice from "./yang/yangSlice";
import promoSlice from "./promoSlider/promoSlice";
import shortSlice from "./short/shortSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    menu: menuSlice,
    program: programSlice,
    reg: regSlice,
    swiper: swiperSlice,
    speaker: speakerSlice,
    category: categorySlice,
    pass: passSlice,
    user: userSlice,
    form: formsSlice,
    yang: yangSlice,
    promo: promoSlice,
    short: shortSlice,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV === "development",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, rtkQueryErrorLogger]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
