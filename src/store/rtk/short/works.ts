import { api } from "../emptyApi";
import { token } from "@/service/token";

export const worksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWorks: build.mutation({
      query: ({
        limit = 100,
        offset = 0,
        category = "",
        nomination = "",
        is_reviewed = "",
        is_short_list = "",
      }) => {
        return {
          url: `/api/jury/works?limit=${limit}&offset=${offset}&category=${category}&nomination=${nomination}&is_reviewed=${is_reviewed}&is_short_list=${is_short_list}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
});

export const { useGetWorksMutation } = worksApi;
