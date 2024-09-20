import { api } from "../emptyApi";

export const worksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWorksShortList: build.query({
      query: ({ category = "", limit = 300, nomination = "", offset = 0 }) => {
        return {
          url: `/api/jury/works/short-list?limit=${limit}&offset=${offset}&category=${category}&nomination=${nomination}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetWorksShortListQuery } = worksApi;
