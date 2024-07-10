import { token } from "@/service/token";
import { api } from "../emptyApi";

export const listApi = api.injectEndpoints({
  endpoints: (build) => ({
    getList: build.query({
      query: ({ limit, offset }) => {
        return {
          url: `/api/orders/list?limit=10&offset=${offset}&limit=${limit}`,
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetListQuery } = listApi;
