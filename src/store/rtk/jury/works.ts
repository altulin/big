import { api } from "../emptyApi";
import { token } from "@/service/token";

export const worksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWorks: build.query({
      query: ({
        limit = 100,
        offset = 0,
        category = "",
        nomination = "",
        is_reviewed = "",
      }) => {
        return {
          url: `/api/jury/works?limit=${limit}&offset=${offset}&category=${category}&nomination=${nomination}&is_reviewed=${is_reviewed}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
});

export const { useLazyGetWorksQuery } = worksApi;
