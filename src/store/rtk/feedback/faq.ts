import { emptyApi } from "../emptyApi";

export const faqApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getFaq: build.query({
      query: () => ({
        url: "/api/feedback/faq",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetFaqQuery } = faqApi;
