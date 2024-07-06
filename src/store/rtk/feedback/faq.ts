import { api } from "../emptyApi";

export const faqApi = api.injectEndpoints({
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
