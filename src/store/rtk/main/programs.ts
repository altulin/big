import { api } from "../emptyApi";

export const programsApi = api.injectEndpoints({
  endpoints: (build) => ({
    programs: build.query({
      query: () => ({
        url: "/api/main/programs",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useProgramsQuery } = programsApi;
