import { api } from "../emptyApi";

export const nominations = api.injectEndpoints({
  endpoints: (build) => ({
    nominationsShort: build.query({
      query: ({ limit, offset }) => ({
        url: `/api/nominations/?offset=${offset}&limit=${limit}`,
      }),
      transformResponse: (response: {
        results: { id: number; title: string }[];
      }) =>
        response.results.map((user) => {
          return { label: user.title, value: user.id };
        }),
    }),
  }),
  overrideExisting: false,
});

export const { useNominationsShortQuery } = nominations;
