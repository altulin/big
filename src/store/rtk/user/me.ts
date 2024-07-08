import { token } from "@/service/token";
import { api } from "../emptyApi";

export const me = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.mutation({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }),
    }),
  }),
  // overrideExisting: false,
});

export const { useGetMeMutation } = me;
