import { api } from "../emptyApi";

export const user = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (name: string) => ({
        url: `/${name}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery } = user;
