import { getErrText } from "@/api/service/getErrText";
import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { setErrorModal } from "./modal/modalSlice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const code = (action.payload as { status: number }).status;
      api.dispatch(setErrorModal(getErrText(code)));
    }

    return next(action);
  };
