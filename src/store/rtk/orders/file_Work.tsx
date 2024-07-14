import { api } from "../emptyApi";
import { token } from "@/service/token";

export const fileWork = api.injectEndpoints({
  endpoints: (build) => ({
    fileWork: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/orders/works/${id}/file`,
        method: "PITCH",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFileWorkMutation } = fileWork;
