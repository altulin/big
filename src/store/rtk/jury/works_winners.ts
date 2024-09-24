import { api } from "../emptyApi";

export const worksWinnersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWinners: build.query({
      query: ({ category = "", limit = 300, nomination = "", offset = 0 }) => {
        return {
          url: `/api/jury/works/winners?limit=${limit}&offset=${offset}&category=${category}&nomination=${nomination}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetWinnersQuery } = worksWinnersApi;
