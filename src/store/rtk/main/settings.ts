import { api } from "../emptyApi";

export const settigsApi = api.injectEndpoints({
  endpoints: (build) => ({
    settigs: build.query({
      query: () => ({
        url: "/api/main/settings",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSettigsQuery } = settigsApi;
