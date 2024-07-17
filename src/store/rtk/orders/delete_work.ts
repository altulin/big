import { token } from "@/service/token";
import { api } from "../emptyApi";

export const deleteWork = api.injectEndpoints({
  endpoints: (build) => ({
    deleteWork: build.query({
      query: ({ id }) => {
        return {
          url: `/api/orders/list/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
  //   overrideExisting: false,
});

export const { useLazyDeleteWorkQuery } = deleteWork;
