import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../emptyApi";
import { token } from "@/service/token";

// export const sendWork = api.injectEndpoints({
//   endpoints: (build) => ({
//     sendWork: build.mutation({
//       query: (body) => ({
//         url: "/api/orders/",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token()}`,
//           "Content-Type": "multipart/form-data",
//         },
//         body,
//       }),
//     }),
//   }),
//   overrideExisting: false,
// });

export const sendWork = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_HOST}`,
    prepareHeaders: (headers) => {
      // headers.delete("Content-Type");
      // headers.set("Content-Type", "multipart/form-data");
      headers.set("Authorization", `Bearer ${token()}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    sendWork: build.mutation({
      query: (body) => ({
        url: "/api/orders/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendWorkMutation } = sendWork;
