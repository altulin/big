import { api } from "../emptyApi";

export const nominations = api.injectEndpoints({
  endpoints: (build) => ({
    nominations: build.query({
      query: ({ limit, offset }) => ({
        url: `/api/nominations/?limit=10&offset=${offset}&limit=${limit}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyNominationsQuery } = nominations;
