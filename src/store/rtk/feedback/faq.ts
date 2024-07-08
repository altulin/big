import { api } from "../emptyApi";

export const faqApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFaq: build.query({
      query: ({ limit, offset }) => {
        return {
          url: `/api/feedback/faq?limit=10&offset=${offset}&limit=${limit}`,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetFaqQuery } = faqApi;
