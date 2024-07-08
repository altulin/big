import { api } from "../emptyApi";

export const registration = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: "/api/users/registration",
        method: "POST",

        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegistrationMutation } = registration;
