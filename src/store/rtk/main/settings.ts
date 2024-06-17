import { emptyApi } from "../emptyApi";

export const settigsApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    settigs: build.query({
      query: () => ({
        url: "/api/main/settings",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazySettigsQuery } = settigsApi;
