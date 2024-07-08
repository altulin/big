import { emptyApi } from "../emptyApi";

export const user = emptyApi.injectEndpoints({
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
