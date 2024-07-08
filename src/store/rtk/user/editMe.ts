import { token } from "@/service/token";
import { api } from "../emptyApi";

export const editMe = api.injectEndpoints({
  endpoints: (build) => ({
    editMe: build.mutation({
      query: (body) => ({
        url: "/api/users/me",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useEditMeMutation } = editMe;
