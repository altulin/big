import { api } from "../emptyApi";
import { token } from "@/service/token";

export const sendWork = api.injectEndpoints({
  endpoints: (build) => ({
    sendWork: build.mutation({
      query: (body) => ({
        url: "/api/orders/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendWorkMutation } = sendWork;
