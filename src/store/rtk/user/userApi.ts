import { emptyApi } from "../emptyApi";

export const userApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (name: string) => ({
        url: `/${name}`,
      }),
      //   transformResponse: (response: { name: string }[]) =>
      //     response.map((user) => user.name),
      // transformErrorResponse: (response: { status: string | number }) => {
      //   return response.status;
      // },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = userApi;
