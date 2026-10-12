import { env } from "@/config/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiHost,
  }),

  endpoints: () => ({}),
});
