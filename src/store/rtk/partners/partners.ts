import { api } from "../emptyApi";

export const partnersApi = api.injectEndpoints({
  endpoints: (build) => ({
    partners: build.query({
      query: () => ({
        url: "/api/partners/?limit=100",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePartnersQuery } = partnersApi;
