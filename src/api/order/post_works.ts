/* eslint-disable @typescript-eslint/no-explicit-any */
import { token } from "@/service/token";
import axs from "../axs";

export const postWorks = (body: any) => {
  return axs.post(
    "/api/orders/",
    body,

    {
      headers: {
        Authorization: `Bearer ${token()}`,
        // "Content-Type": "multipart/form-data",
      },
    },
  );
};
