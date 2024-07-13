import { token } from "@/service/token";
import { api } from "../emptyApi";

export const getWork = api.injectEndpoints({
  endpoints: (build) => ({
    getWork: build.query({
      query: ({ id }) => {
        return {
          url: `/api/orders/works/${id}`,
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
  //   overrideExisting: false,
});

export const { useLazyGetWorkQuery } = getWork;
