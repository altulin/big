import { api } from "../emptyApi";

export const authorization = api.injectEndpoints({
  endpoints: (build) => ({
    authorization: build.mutation({
      query: (body) => ({
        url: "/api/users/authorization",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthorizationMutation } = authorization;
