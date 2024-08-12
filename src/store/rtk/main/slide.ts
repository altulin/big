import { api } from "../emptyApi";

export const slideApi = api.injectEndpoints({
  endpoints: (build) => ({
    slide: build.query({
      query: () => ({
        url: "/api/main/slide",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSlideQuery } = slideApi;
