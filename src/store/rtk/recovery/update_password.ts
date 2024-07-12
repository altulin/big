import { api } from "../emptyApi";

export const updatePassword = api.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation({
      query: (body) => ({
        url: "/api/users/recovery/update-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdatePasswordMutation } = updatePassword;
